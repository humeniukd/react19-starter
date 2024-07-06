import { Hero } from './Hero.tsx';
import App from "./App.tsx";

export const routes = [
    {
        path: "/",
        Component: App,
        children: [
            {
                Component: Hero,
                index: true,
            },
        ]
    }
];