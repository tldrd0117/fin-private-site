
export const TAG_SEPARATOR = "(/*/)";

export const parsePostText = (text: string) => {
    const splitText = text.split("\n");
    const map: any = {}
    let isTitle = false;
    splitText.forEach(element => {
        if(element.trim().startsWith("---")){
            isTitle = !isTitle;
        } else if(isTitle) {
            const keyValue = element.split(":")
            let key = keyValue[0].trim(), value: any = keyValue[1].trim()
            if(key === "tags"){
                value = value.split(TAG_SEPARATOR).filter((v:any)=>v)
            }
            map[key] = value
        } else {
            map["contents"] = map["contents"]? map["contents"] +"\n" + element : element
        }
    });
    return map
}