const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const site = {
  author: "Thibaut Izard",
  description: "Blog personnel de Thibaut Izard",
  language: "fr-FR",
  title: "frenchdev",
  url: productionHost ? `https://${productionHost}` : "http://localhost:3000",
};
