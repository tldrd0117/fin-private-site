import { Date, Types, Document } from 'mongoose';

//종목코드	종목명	종가	대비	등락률	시가	고가	저가	거래량	거래대금	시가총액	상장주식수	date	market
export interface IKrxMarcap extends Document {
    _id: Types.ObjectId;
    종목코드: string;
    종목명: string;
    종가: number;
    대비: number;
    등락률: number;
    시가: number;
    고가: number;
    저가: number;
    거래량: number;
    거래대금: number;
    시가총액: number;
    상장주식수: number;
    date: Date;
    market: string;
}
