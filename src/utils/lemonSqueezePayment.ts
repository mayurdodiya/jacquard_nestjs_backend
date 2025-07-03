// import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
// import axios from 'axios';

// export class LemonSqueezyService {
//   private readonly apiUrl = 'https://api.lemonsqueezy.com/v1';
//   private readonly apiKey = process.env.LEMON_API_KEY;
//   private readonly variantId = process.env.VARIANT_ID;

//   async createPaymentLink(checkoutData?: any): Promise<any> {
//     try {
//       const response = await axios.post(
//         `${this.apiUrl}/checkouts`,
//         {
//           data: {
//             type: 'checkouts',
//             attributes: {
//               checkout_data: {
//                 ...checkoutData, // optional: email, name, etc.
//               },
//               variant_id: this.variantId,
//             },
//           },
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${this.apiKey}`,
//             'Content-Type': 'application/vnd.api+json',
//             Accept: 'application/vnd.api+json',
//           },
//         },
//       );

//       const paymentUrl = response.data?.data?.attributes?.url;
//       return { paymentUrl };
//     } catch (err) {
//       console.error('Lemon Squeezy Error:', err.response?.data || err.message);
//       throw new HttpException('Unable to create payment link', HttpStatus.BAD_REQUEST);
//     }
//   }
// }


import axios from 'axios';
import { HttpException } from '@nestjs/common';

export class LemonSqueezyService {
  private readonly baseUrl = 'https://api.lemonsqueezy.com/v1';
  private readonly apiKey = process.env.LEMON_API_KEY;
  private readonly variantId = process.env.VARIANT_ID;

  async createPaymentLink({ email }: { email: string }) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/checkouts`,
        {
          "data": {
            "type": "checkouts",
            "attributes": {
              "custom_price": 50000,
              "product_options": {
                "enabled_variants": this.variantId
              },
              "checkout_options": {
                "button_color": "#7047EB"
              },
              "checkout_data": {
                // "discount_code": "10PERCENTOFF",
                "custom": {
                  "user_id": "123"
                }
              },
              "expires_at": "2025-10-30T15:20:06Z",
              "preview": true
            },
            "relationships": {
              "store": {
                "data": {
                  "type": "stores",
                  "id": "194730"
                }
              },
              "variant": {
                "data": {
                  "type": "variants",
                  "id": "871501"
                }
              }
            }
          }
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response?.data?.data?.attributes?.url);
      return response.data;
    } catch (error) {
      console.error('Lemon Squeezy Error:', error.response?.data || error);
      throw new HttpException('Unable to create payment link', 400);
    }
  }
}
