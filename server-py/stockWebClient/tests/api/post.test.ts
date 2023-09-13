import { getPublicKey } from "@/data/api/auth";
import { PostCreate, PostUpdate } from "@/data/api/interfaces/post";
import { getPost, getPostList, updatePost } from "@/data/api/post";
import { searchPosts } from "@/data/api/post";
import { deletePost } from "@/data/api/post";
import { createPost } from "@/data/api/post";
import { loginUser } from "@/data/api/user";
import { decryptToken } from "@/data/api/utils/cryptoUtils";
import sha256 from "crypto-js/sha256";
import { JWK, JWTPayload, KeyLike, importJWK } from "jose";

describe("post api", () => {
    let token: string;
    let user: JWTPayload;
    let rsaPublicKey: KeyLike;
    let postId: string;

    beforeEach(async () => {
        const response = await getPublicKey()
        const encPublicKey: JWK = response.keys.find((key: JWK)=>key.use === "enc")
        rsaPublicKey = (await importJWK(encPublicKey)) as KeyLike
        
        const loginResponse = await loginUser({
            email: `tester01@naver.com`,
            password: sha256("12345678").toString()
        }, rsaPublicKey)
        expect(loginResponse).toHaveProperty("result", "success")
        expect(loginResponse).toHaveProperty("token")
        token = loginResponse.token;
        user = await decryptToken(loginResponse.token);
        console.log(token, user)
        
    });

    beforeEach(async () => {
        const postCreate: PostCreate = {
            author: user._id as string,
            authorName: user.name as string,
            summary: "test summary",
            text: "test text"
        }
        const res = await createPost(postCreate, rsaPublicKey, token)
        postId = res._id as string;
    });


    it("should create post", async () => {
        const postCreate: PostCreate = {
            author: user._id as string,
            authorName: user.name as string,
            summary: "test summary",
            text: "test text"
        }
        const res = await createPost(postCreate, rsaPublicKey, token)
        expect(res).toMatchObject({
            author: '6469d617a113f0a97e92539f',
            authorName: 'testUser',
            summary: 'test summary',
            text: 'test text',
            relatedPosts: [],
            result: 'success'
        })
    });

    it("should get post", async () => {
        const post = await getPost({
            _id: postId
        })
        expect(post).toMatchObject({
            author: { _id: '6469d617a113f0a97e92539f', name: 'testUser' },
            authorName: 'testUser',
            summary: 'test summary',
            text: 'test text',
            relatedPosts: [],
            result: 'success'
        })
    });

    it("should get post list", async () => {
        const post = await getPostList({
            limit: 10,
            offset: 0
        })
        expect(post).toHaveProperty("list")
        expect(post).toHaveProperty("total")
        if(post.total > 0){
            expect(post.list).toHaveLength(post.total < 10?post.total: 10)
            expect(post.list[0]).toMatchObject({
                author: { _id: '6469d617a113f0a97e92539f', name: 'testUser' },
                authorName: 'testUser',
                summary: 'test summary',
                text: 'test text',
                relatedPosts: [],
            })
        }
    });

    it("should update post", async () => {
        const postUpdate: PostUpdate = {
            _id: postId,
            text: "test summary update",
        }
        const result = await updatePost(postUpdate, rsaPublicKey, token)
        expect(result.modifiedCount).toBe(1)
        expect(result.result).toBe("success")
    });

    it("should search post list", async () => {
        const post = await searchPosts({
            limit: 10,
            offset: 0,
            word: "update"
        })
        expect(post.list.every((post: any) => post.text.includes("update"))).toBe(true);
    });


    it("should delete post", async () => {
        const result = await deletePost({
            _id: postId
        }, rsaPublicKey, token)
        expect(result.deletedCount).toBe(1)
        expect(result.result).toBe("success")
    });

});