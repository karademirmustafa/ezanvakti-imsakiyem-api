import { injectable } from "inversify";
import { BaseHttpController } from "inversify-express-utils";
import { asyncHandler } from "../utils/async-handler.util";

@injectable()
export class BaseController extends BaseHttpController {
  constructor() {
    super();
  }

  protected wrapAsync(handler: Function) {
    return asyncHandler(handler.bind(this));
  }
}
