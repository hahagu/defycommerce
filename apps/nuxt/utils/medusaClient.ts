import MedusaBase from '@medusajs/medusa-js';
import {
  ProductReviewsResource,
  ProductReviewRequestsResource,
} from "@lambdacurry/medusa-plugin-product-reviews-client";

class Medusa extends MedusaBase {
  public productReviews: ProductReviewsResource;
  public productReviewRequests: ProductReviewRequestsResource;

  constructor(config: any) {
    super(config);
    this.productReviews = new ProductReviewsResource(this.client);
    this.productReviewRequests = new ProductReviewRequestsResource(this.client);
  }
}

export { Medusa };
