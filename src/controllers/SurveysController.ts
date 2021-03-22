import { Request, Response } from "express-serve-static-core";
import { getCustomRepository } from "typeorm";
import SurveysRepository from "../repositories/SurveysRepository";


class SurveysController {
  async create(request: Request, response: Response) {
    const { title, description } = request.body;

    const surveysRepository = getCustomRepository(SurveysRepository)

    const survey = surveysRepository.create({
      title,
      description
    });

    await surveysRepository.save(survey);

    return response.status(201).json(survey)
  }

  async show(request: Request, response: Response) {
    const surveysRepository = getCustomRepository(SurveysRepository)

    const surveysAll = await surveysRepository.find()

    return response.json(surveysAll)
  }

}

export default SurveysController;