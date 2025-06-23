import dbConnect from '@/lib/mongodb'
import Product from '@/models/Product'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { id } = req.query

	await dbConnect()

	if (req.method === 'DELETE') {
		try {
			const deletedProduct = await Product.findByIdAndDelete(id)
			if (!deletedProduct) {
				return res.status(404).json({ message: 'Produsul nu a fost găsit.' })
			}
			return res.status(200).json({ message: 'Produs șters cu succes.' })
		} catch (error) {
			return res
				.status(500)
				.json({ message: 'Eroare la ștergerea produsului.' })
		}
	} else {
		res.setHeader('Allow', ['DELETE'])
		res.status(405).end(`Metoda ${req.method} nu este permisă.`)
	}
}
