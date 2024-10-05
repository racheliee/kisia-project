import { Injectable, Logger } from '@nestjs/common';
import { count } from 'console';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class ModelService {
  private readonly logger = new Logger(ModelService.name);
  constructor(private readonly prismaService: PrismaService) {}

  // confusion matrix logic ========================================
  async getConfusionMatrix(model?: string) {
    if (model) {
      const databaseResult =
        await this.prismaService.confusionMatrix.findUnique({
          where: { modelType: model },
        });

      if (databaseResult) {
        this.logger.log(`Found confusion matrix for model: ${model}`);
        return {
          modelType: databaseResult.modelType,
          truePositive: databaseResult.truePos,
          trueNegative: databaseResult.trueNeg,
          falsePositive: databaseResult.falsePos,
          falseNegative: databaseResult.falseNeg,
        };
      }
    }else{
        const databaseResult = await this.prismaService.confusionMatrix.findMany();

        if (databaseResult) {
          this.logger.log(`Found confusion matrix for all models`);
          return databaseResult.map((result) => {
            return {
              modelType: result.modelType,
              truePositive: result.truePos,
              trueNegative: result.trueNeg,
              falsePositive: result.falsePos,
              falseNegative: result.falseNeg,
            };
          });
        }
    }
  }

  // confidence hit rate logic ========================================
  async getConfidenceHitRate() {
    const databaseResult = await this.prismaService.confidenceHitRate.findMany();

    if (databaseResult) {
      this.logger.log(`Found confidence hit rate for all models`);
      return databaseResult.map((result) => {
        return {
          confidenceRange: result.confidenceRange,
          count: result.count,
        };
      });
    }
  }
}
