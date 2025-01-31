import Controller from '../interfaces/controller.interface';
import { Request, Response, NextFunction, Router } from 'express';
import { checkPostCount } from '../middlewares/checkPostCount.middleware';
import DataService from '../modules/services/data.service';
import Joi from 'joi';

class PostController implements Controller {
   public path = '/api/post';
   public router = Router();
   public dataService = new DataService();

   constructor() {
       this.initializeRoutes();
   }

   private initializeRoutes() {
    this.router.get(`${this.path}s`, this.getAll);
    this.router.get(`${this.path}/:id`, this.getElementById);
    this.router.get(`${this.path}s/:num`, checkPostCount, this.getMul);

    this.router.post(`${this.path}`, this.addData);
    this.router.options(`${this.path}`, this.addData);

    this.router.delete(`${this.path}s`, this.removeAll);
    this.router.delete(`${this.path}/:id`, this.removePost);
    }


    private getAll = async (request: Request, response: Response, next: NextFunction) => {
        const allData = await this.dataService.query({});
        response.status(200).json(allData);
    }

     private getElementById = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        const allData = await this.dataService.getById(id);
        response.status(200).json(allData);
     }

     private getMul = async (request: Request, response: Response, next: NextFunction) => {
        const { num } = request.params;
        const allData = await this.dataService.query({});
        const selectedData = allData.slice(0, parseInt(num))
        response.status(200).json(selectedData);
     }


    private addData = async (request: Request, response: Response, next: NextFunction) => {
        const {title, text, image} = request.body;
        const schema = Joi.object({
         title: Joi.string().required(),
         text: Joi.string().required(),
         image: Joi.string().uri().required()
        })

        try {
            const readingData = await schema.validateAsync({title, text, image});
            await this.dataService.createPost(readingData);
            response.status(200).json(readingData);
        } catch (error) {
            console.log('eeee', error)
     
            console.error(`Validation Error: ${error.message}`);
            response.status(400).json({error: 'Invalid input data.'});
        }
     }
     
     
     private removePost = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        await this.dataService.deleteById(id);
        response.status(200).json({"msg": "OK"});
     };

     private removeAll = async (request: Request, response: Response, next: NextFunction) => {
        await this.dataService.deleteAllPosts();
        response.status(200).json({"msg": "OK"});
     };

}

export default PostController;