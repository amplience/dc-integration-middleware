import express, { Request, Response } from 'express'
import { middleware } from './middleware'
import 'isomorphic-unfetch'

const app = express()
const port = 3000 // Default port to listen.

/**
 * Wraps middleware in an express handler.
 * @param req Request object
 * @param res Response object
 * @param next Next handler
 */
const wrappedMiddleware = async (req: Request, res: Response, next: any) => {
	try {
		await middleware(req, res)
	} catch (e) {
		console.log(e.stack)

		if (e.helpUrl) {
			console.error(e.getMessage())
		}
		res.status(500).json(e)
	}
}

// Define a route handler for the default home page.
app.post('/api', wrappedMiddleware)
app.get('/api', wrappedMiddleware)

// Start the express server.
app.listen(port, () => {
	// tslint:disable-next-line:no-console
	console.log(`server started at http://localhost:${port}`)
})