import BaseResponse from './BaseResponse';
import { Ok } from './types';

export default class OkResponse extends BaseResponse implements Ok {
    constructor(success = true) {
        super(success);
    }
}