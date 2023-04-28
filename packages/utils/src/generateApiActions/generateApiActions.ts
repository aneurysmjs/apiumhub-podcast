import snakeCase from 'lodash.snakeCase';
import toUpper from 'lodash.toupper';

const apiActions = ['REQUEST', 'SUCCESS', 'FAILURE'] as const;

type HTTPVerbs = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'PATCH';

type ApiActionNames<Name extends string, HTTPVerb extends HTTPVerbs> = [
  `${HTTPVerb}_${Uppercase<Name>}_REQUEST`,
  `${HTTPVerb}_${Uppercase<Name>}_SUCCESS`,
  `${HTTPVerb}_${Uppercase<Name>}_FAILURE`,
];

export default function generateApiActions<T extends string, HTTPVerb extends HTTPVerbs>(
  actionName: T,
  httpVerb: HTTPVerb,
): ApiActionNames<typeof actionName, typeof httpVerb> {
  return apiActions.map(
    (apiAction) => `${httpVerb}_${toUpper(snakeCase(actionName))}_${apiAction}`,
  ) as ApiActionNames<typeof actionName, typeof httpVerb>;
}
