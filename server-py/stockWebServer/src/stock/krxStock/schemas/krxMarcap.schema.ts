import { Schema } from 'mongoose';
import { IKrxMarcap } from '../interface/krxMarcap.interface';

const krxMarcapSchema = new Schema<IKrxMarcap>({
    종목코드: { type: String, required: true },
    종목명: { type: String, required: true },
    종가: { type: Number, required: false },
    대비: { type: Number, required: false },
    등락률: { type: Number, required: false },
    시가: { type: Number, required: false },
    고가: { type: Number, required: false },
    저가: { type: Number, required: false },
    거래량: { type: Number, required: false },
    거래대금: { type: Number, required: false },
    시가총액: { type: Number, required: false },
    상장주식수: { type: Number, required: false },
    date: { type: Date, required: true },
    market: { type: String, required: true },
});

krxMarcapSchema.index({ 종목코드: 1 }, { unique: false });
krxMarcapSchema.index({ 종목명: 1 }, { unique: false });
krxMarcapSchema.index({ date: 1 }, { unique: false });
krxMarcapSchema.index({ 종목코드: 1, date: 1 }, { unique: true });

export default krxMarcapSchema;
