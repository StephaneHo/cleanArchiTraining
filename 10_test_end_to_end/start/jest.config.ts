import type { Config } from "jest";

export default async (): Promise<Config> => {
  return {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    testEnvironmentOptions: {
      customExportConditions: [""],
    },
    transform: {
      "^.+\\.(js|ts|tsx)$": "ts-jest",
    },
    transformIgnorePatterns: ["/node_modules/"],
    moduleNameMapper: {
      "\\.(avif|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
        "jest-transform-stub",
      "@foodsapp/domain/(.*)$": ["<rootDir>/src/domain/$1"],
      "@foodsapp/application/models/(.*)$": [
        "<rootDir>/src/application/models/$1",
      ],
      "@foodsapp/application/usecases/(.*)$": [
        "<rootDir>/src/application/usecases/$1",
      ],
      "@foodsapp/infrastructure/(.*)$": ["<rootDir>/src/infrastructure/$1"],
      "@foodsapp/components/(.*)$": [
        "<rootDir>/src/userinterface/components/$1",
      ],
      "@foodsapp/pages/(.*)$": ["<rootDir>/src/userinterface/pages/$1"],
      "@foodsapp/di/ioc": ["<rootDir>/src/di/ioc.ts"],
      "@foodsapp/store": ["<rootDir>/src/store/store.ts"],
      "@foodsapp/utils/(.*)$": ["<rootDir>/src/utils/$1"],
      "@foodsapp/adapters/(.*)$": ["<rootDir>/src/adapters/$1"],
      "@foodsapp/tests/mocks": ["<rootDir>/tests/mocks/mocks.js"],
    },
  };
};
