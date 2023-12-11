import { ApiResponse } from "../types/ApiResponse";

import demoProductData from "./demo-data.json";
import { ProductDetails } from "../product/types";

export default function getProductData(
  id: string
): Promise<ApiResponse<ProductDetails>> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = demoProductData.find((item) => item.id === id);
      if (product) {
        const apiResponse: ApiResponse<ProductDetails> = {
          data: product,
        };
        resolve(apiResponse);
      } else {
        reject({ error: `No product found for product id: ${id}` });
      }
    }, 2000);
  });
}
