import { Request, Response } from "express";
import { getCustomRepository, IsNull, Not } from "typeorm";
import SurveysUsersRepository from "../repositories/SurveysUsersRepository";

class NpsController {
  
  /*
    1 2 3 4 5 6 7 8 9 10
    Detratores: 0 - 6
    Passivos: 7 - 8
    Promotores: 9 - 10

    ((numero de promotores - numero de detratores) / numero de respondentes) x 100
  */

  async execute(request: Request, response: Response) {
    const { survey_id } = request.params;

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const surveysUsers = await surveysUsersRepository.find({
      survey_id,
      value: Not(IsNull())
    })

    const detractors = surveysUsers.filter(
      (survey) => survey.value >= 0 && survey.value <= 6
    ).length;

    const promotors = surveysUsers.filter(
      (survey) => survey.value >= 9 && survey.value <= 10
    ).length;

    const passives = surveysUsers.filter(
      (survey) => survey.value >= 7 && survey.value <= 8
    ).length;

    const totalAnswers = surveysUsers.length;

    const calculate = Number(
      (((promotors - detractors) / totalAnswers) * 100).toFixed(2))

    return response.json({
      detractors,
      promotors,
      passives,
      totalAnswers,
      calculate
    })

  }
}

export default NpsController;