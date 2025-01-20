import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import PersonalPage from "@/views/PersonalPage.vue";
import RecipesView from "@/views/RecipesView.vue";
import RecipeDetails from "@/views/RecipeDetails.vue";
import ChefsView from "@/views/ChefsView.vue"; // Импорт компонента профиля кулинара
import ChefProfile from "@/views/ChefProfile.vue"; // Импорт компонента профиля кулинара

const routes = [
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/personal-page",
    name: "PersonalPage",
    component: PersonalPage,
  },
  {
    path: "/recipes",
    name: "recipes",
    component: RecipesView,
  },
  {
    path: "/recipes/:id",
    name: "RecipeDetails",
    component: RecipeDetails,
    props: true, // Передаем параметры как свойства в компонент
  },
  {
    path: "/chefs",
    name: "chefs",
    component: ChefsView,
  },
  {
    path: "/chef", // Маршрут для профиля кулинара
    name: "ChefProfile",
    component: ChefProfile,
    props: (route) => ({
      img: route.query.img,
      title: route.query.title,
      description: route.query.description,
    }),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
