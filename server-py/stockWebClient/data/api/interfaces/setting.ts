export interface CategoriesCreate{
    categories: Array<string>
}

export interface SettingUpdate{
    _id: string
    type?: string
    role?: string;
    userId?: string
    name?: string;
    value?: string;
    createAt?: Date;
    updateAt?: Date;
}

export interface SettingUpdateList{
    list: Array<SettingUpdate>
}

export interface SettingCreate{
    type: string
    name: string;
    value: string;
}

export interface SettingsDelete{
    ids: Array<string>
}

export interface SettingGetList{
    limit: number;
    offset: number;
}