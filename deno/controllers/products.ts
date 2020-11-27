import { v4 } from 'https://deno.land/std/uuid/mod.ts'
import { Product } from '../types.ts'

let products: Product[] = [
    {
        id: v4.generate(),
        name: 'Product one',
        description: "This is product one",
        price: 29.99
    },
    {
        id: v4.generate(),
        name: 'Product two',
        description: "This is product two",
        price: 59.99
    },{
        id: v4.generate(),
        name: 'Product three',
        description: "This is product three",
        price: 99.99
    }
]

// @desc Get all products
// @route GET /api/v1/products

const getProducts = ({ response }: { response: any }) => {
    response.body = {
        success: true,
        api: 'deno',
        data: products
    }
}

// @desc Get single product
// @route GET /api/v1/products/:id

const getProduct = ({ params, response }: { params: { id: string }, response: any }) => {
    const product: Product | undefined = products.find(p => p.id === params.id)

    if(product) {
        response.status = 200
        response.body = {
            sucess: true,
            data: product
        }
    } else {
        response.status = 404
        response.body = {
            sucess: false,
            message: 'No product found'
        }
    }
}

// @desc Add product
// @route POST /api/v1/products/

const addProduct = async ({ request, response }: { request: any, response: any }) => {
    const body = await request.body()
    if (!request.hasBody) {
        response.status = 400
        response.body = {
            sucess: false,
            message: 'No data'
        }
    } else {
        const product: Product = body.value
        product.id = v4.generate()
        products.push(product)
        response.status = 201
        response.body = {
            sucess: true,
            data: product
        }
    }
}

// @desc Update product
// @route PUT /api/v1/products/:id

const updateProduct = async ({ params, request, response }: { params: { id: string }, request: any, response: any }) => {
    const product: Product | undefined = products.find(p => p.id === params.id)

    if(product) {
        const body =  await request.body()
        const updateData: { name?: string; description?: string; price?: number } = body.value
        products = products.map(p => p.id === params.id ? { ...p, ...updateData } : p)
        
        response.status = 200
        response.body = {
            sucess: true,
            data: products
        }

    } else {
        response.status = 404
        response.body = {
            sucess: false,
            message: 'No product found'
        }
    }   
}

// @desc Delete product
// @route DELETE /api/v1/products/:id

const deleteProduct = ({ params, response }: { params: { id: string }, response: any }) => {
    products = products.filter(p => p.id !== params.id )
    response.body = {
        sucess: true,
        message: 'product removed correctly'
    }
}

export { getProducts, getProduct, addProduct, updateProduct, deleteProduct }