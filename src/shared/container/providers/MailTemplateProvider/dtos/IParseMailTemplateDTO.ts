interface ITemplateVariables {
  [key: string]: string | number; // Criação de multiplas variáveis com N propriedades
}

export default interface IParseMailTemplateDTO {
  file: string;
  variables: ITemplateVariables;
}
