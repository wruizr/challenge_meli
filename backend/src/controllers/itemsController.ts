import { Request, Response } from 'express'
import { getItemDetail, searchItems } from '../services/meliService'
import { Author, GenerateTitleResponse, Item, ItemDetail, ItemDetailResponse, ItemsResponse } from '../interfaces/apiResponse';

const author: Author = {
    name: 'Wilson',
    lastname: 'Ruiz'
}

export const searchItemsController = async (req: Request, res: Response) => {
    const { q } = req.query as { q: string }
    if (!q || typeof q !== 'string') {
      res.status(400).json({ error: 'El parámetro "q" es requerido y debe ser una cadena.' });
    }
    try {
        const response = await searchItems(q)
        const items: Item[] = response.results.map((item) => ({
            id: item.id,
            title: item.title,
            price: {
                currency: item.currency_id,
                amount: item.price,
                decimals: 2,
                regular_amount: item.original_price
            },
            picture: item.thumbnail,
            condition: item.condition,
            free_shipping: item.shipping.free_shipping
        }))
        const itemsResponse: ItemsResponse = {
            author,
            items,
          };
        res.json(itemsResponse);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los resultados.'})
    }
}

export const getItemDetailController = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
      const {itemResponse, descriptionResponse, sellerResponse} = await getItemDetail(id)
  
      const item: ItemDetail = {
        id: itemResponse.id,
        title: itemResponse.title,
        price: {
            currency: itemResponse.currency_id,
            amount: itemResponse.price,
            decimals: 2,
        },
        picture: itemResponse.pictures[0].url,
        condition: itemResponse.condition,
        free_shipping: itemResponse.shipping.free_shipping,
        sold_quantity: sellerResponse.seller_reputation.transactions.total,
        description: descriptionResponse.plain_text,
    }
  
      const response: ItemDetailResponse = {
        author,
        item: item,
      };
  
      res.json(response);
    } catch (error) {
      res.status(500).json({  error: 'Error al obtener el resultado.' });
    }
  };

  export const generateTitleController = async (req: Request, res: Response) => {
    const { title } = req.params;
    try {
      const titleIA = `Título optimizado con IA ${title}`;
  
      const response: GenerateTitleResponse = {
        author,
        title: titleIA,
        useIAIntegration: true,
      };
  
      res.json(response);
    } catch (error) {
      res.status(500).json({  error: 'Error al generar el resultado.' });
    }
  };

  export const saveItemTitleController = async (req: Request, res: Response) => {
    const { title, useIAIntegration } = req.body;
    try{
      if (!title) {
        res.status(400).json({ message: 'El título es requerido' });
      }

      if (title.toLowerCase().includes('bomba')) {
        res.status(400).json({ message: 'No se pudo guardar el título' });
      }

      res.status(200).json({ message: `Título guardado correctamente: ${title}` });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los resultados.'})
    }
}