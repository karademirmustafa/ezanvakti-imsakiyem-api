import { NextFunction, Request, Response } from "express";
import { inject } from "inversify";
import { LocationService } from "../services/location.service";
import { controller, httpGet } from "inversify-express-utils";
import { BaseController } from "./base.controller";
import { locationValidationSchemas } from "../validations/location.validation";
import { MESSAGES } from "../constants/messages.constants";
import { handleLocationRequest } from "../utils/location.util";
import { LocationTypes } from "../constants/enums";
import { capitalize } from "../utils/string.util";
import { validate } from "../middlewares/validation.middleware";

@controller("/api/locations")
export class LocationController extends BaseController {
  constructor(
    @inject(LocationService)
    private locationService: LocationService
  ) {
    super();
  }

  @httpGet(
    "/search/:type",
    validate(locationValidationSchemas.paramsValidation),
    validate(locationValidationSchemas.searchQueryValidation)
  )
  async searchLocations(req: Request, res: Response, next: NextFunction) {
    const { type } = req.params;
    const query = req.query.q as string;
    // TODO : Dönüş kısmı validationError olarak dönecek şekilde yapılmalı.
    if (!Object.values(LocationTypes).includes(type as LocationTypes)) {
      return res.notFound(MESSAGES.ERROR.NOT_FOUND);
    }

    try {
      const data = await handleLocationRequest(
        this.locationService,
        type as LocationTypes,
        undefined,
        query
      );
      res.success(data, MESSAGES.ENDPOINT.SEARCH_RESULTS_FETCHED);
    } catch (err) {
      next(err);
    }
  }

  @httpGet("/:type/:id", validate(locationValidationSchemas.paramsValidation))
  async getLocationDetails(req: Request, res: Response) {
    const { type, id } = req.params;
    if (!Object.values(LocationTypes).includes(type as LocationTypes)) {
      return res.notFound(MESSAGES.ERROR.NOT_FOUND);
    }

    const data = await handleLocationRequest(
      this.locationService,
      type as LocationTypes,
      id
    );

    if (!data) {
      return res.notFound(MESSAGES.ENDPOINT[`${type.toUpperCase()}_NOT_FOUND`]);
    }
    res.success(
      data,
      MESSAGES.ENDPOINT[`${type.toUpperCase()}_DETAILS_FETCHED`]
    );
  }

  @httpGet("/:type", validate(locationValidationSchemas.paramsValidation))
  async getLocations(req: Request, res: Response) {
    const { type } = req.params;
    const parentId =
      (req.query.countryId as string) || (req.query.stateId as string);

    if (!Object.values(LocationTypes).includes(type as LocationTypes)) {
      return res.notFound(MESSAGES.ERROR.NOT_FOUND);
    }

    const data = await handleLocationRequest(
      this.locationService,
      type as LocationTypes,
      undefined,
      undefined,
      parentId
    );

    if (!data) {
      return res.notFound(MESSAGES.ERROR.NOT_FOUND);
    }
    res.success(data, MESSAGES.ENDPOINT[`${type.toUpperCase()}_FETCHED`]);
  }
}
