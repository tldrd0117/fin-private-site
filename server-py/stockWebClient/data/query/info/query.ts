import { useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "../common/constants"
import { getTypes } from "@/data/api/info"
import { useSetRecoilState } from "recoil"
import { roleTypeMapState, roleTypeSelectList, settingTypeMapState, settingTypeSelectList } from "@/data/recoil/states/user"
import { BasicTypes, SelectList } from "@/data/api/interfaces/common"

export const useTypes = () => {
    const setSettingTypeMap = useSetRecoilState(settingTypeMapState)
    const setRoleTypeMap = useSetRecoilState(roleTypeMapState)
    const setSettingTypeSelectList = useSetRecoilState(settingTypeSelectList)
    const setRoleTypeSelectList = useSetRecoilState(roleTypeSelectList)
    return useQuery([QUERY_KEYS.INFO.TYPE], async () => {
        let value = await getTypes()
        let settingTypeMap: any = {
            name: {},
            _id: {},
        }, roleTypeMap: any = {
            name: {},
            _id: {},
        }
        const settingTypeSelectList: SelectList[] = []
        const roleTypeSelectList: SelectList[] = []
        value.settingTypes.forEach((type: BasicTypes) => {
            settingTypeMap.name[type.name] = type._id
            settingTypeMap._id[type._id] = type.name
            settingTypeSelectList.push({
                id: type._id,
                value: type.name,
            })
        })
        value.roleTypes.forEach((type: BasicTypes) => {
            roleTypeMap.name[type.name] = type._id
            roleTypeMap._id[type._id] = type.name
            roleTypeSelectList.push({
                id: type._id,
                value: type.name,
            })
        })
        setSettingTypeMap(settingTypeMap)
        setRoleTypeMap(roleTypeMap)
        setSettingTypeSelectList(settingTypeSelectList)
        setRoleTypeSelectList(roleTypeSelectList)
        return value
    })
}