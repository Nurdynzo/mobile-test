import {
  optionalNumberValidation,
  optionalStringValidation,
} from '@/utils/schema';
import {z} from 'zod';

const diagnosisByTerm = z.object({
  id: z.string(),
  name: z.string(),
});

export const addMemberDetailsFormSchema = z.object({
  relationship: optionalStringValidation,
  isAlive: z.boolean().optional(),
  ageOfDeath: optionalNumberValidation,
  causeOfDeath: z.array(diagnosisByTerm),
  seriousIllnesses: z.array(diagnosisByTerm),
  ageAtDiagnosis: optionalNumberValidation,
});
export const editFamilyHistoryFormSchema = z.object({
  isFamilyHistoryNotKnown: z.boolean().optional(),
  noOfFemaleChildren: optionalNumberValidation,
  noOfMaleChildren: optionalNumberValidation,
  noOfFemaleSiblings: optionalNumberValidation,
  noOfMaleSiblings: optionalNumberValidation,
  members: z.array(addMemberDetailsFormSchema),
});

export type EditFamilyHistoryFormSchema = z.infer<
  typeof editFamilyHistoryFormSchema
>;
export type AddMemberDetailsFormSchema = z.infer<
  typeof addMemberDetailsFormSchema
>;
