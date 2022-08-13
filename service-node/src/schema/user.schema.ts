import { object, string } from 'zod'
/**
 * @openapi
 * components:
 *   schema:
 *     Product:
 *       type: object
 *       required:
 *        - title
 *        - description
 *        - price
 *        - image
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         image:
 *           type: string
 */
export const createUserSchema = object({
  body: object({
    name: string({
      required_error: "Name is required"
    }),
    password: string({
      required_error: "Password is required"
    }).min(6, "Password too short - should be at least 6 characters"),
    email: string({
      required_error: "Email is required"
    }).email('not a valid email')
  })
})
