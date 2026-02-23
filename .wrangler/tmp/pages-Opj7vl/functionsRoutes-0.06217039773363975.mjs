import { onRequestDelete as __api_admin_links_ts_onRequestDelete } from "/home/diop/Projets/learn-dev-e-commerce/bubaaxbi/aminata-diop/functions/api/admin/links.ts"
import { onRequestPost as __api_admin_links_ts_onRequestPost } from "/home/diop/Projets/learn-dev-e-commerce/bubaaxbi/aminata-diop/functions/api/admin/links.ts"
import { onRequestPut as __api_admin_links_ts_onRequestPut } from "/home/diop/Projets/learn-dev-e-commerce/bubaaxbi/aminata-diop/functions/api/admin/links.ts"
import { onRequestPost as __api_admin_login_ts_onRequestPost } from "/home/diop/Projets/learn-dev-e-commerce/bubaaxbi/aminata-diop/functions/api/admin/login.ts"
import { onRequestDelete as __api_admin_projects_ts_onRequestDelete } from "/home/diop/Projets/learn-dev-e-commerce/bubaaxbi/aminata-diop/functions/api/admin/projects.ts"
import { onRequestPost as __api_admin_projects_ts_onRequestPost } from "/home/diop/Projets/learn-dev-e-commerce/bubaaxbi/aminata-diop/functions/api/admin/projects.ts"
import { onRequestPut as __api_admin_projects_ts_onRequestPut } from "/home/diop/Projets/learn-dev-e-commerce/bubaaxbi/aminata-diop/functions/api/admin/projects.ts"
import { onRequestPut as __api_admin_sections_ts_onRequestPut } from "/home/diop/Projets/learn-dev-e-commerce/bubaaxbi/aminata-diop/functions/api/admin/sections.ts"
import { onRequestPut as __api_admin_settings_ts_onRequestPut } from "/home/diop/Projets/learn-dev-e-commerce/bubaaxbi/aminata-diop/functions/api/admin/settings.ts"
import { onRequestGet as __api_links_ts_onRequestGet } from "/home/diop/Projets/learn-dev-e-commerce/bubaaxbi/aminata-diop/functions/api/links.ts"
import { onRequestGet as __api_projects_ts_onRequestGet } from "/home/diop/Projets/learn-dev-e-commerce/bubaaxbi/aminata-diop/functions/api/projects.ts"
import { onRequestGet as __api_sections_ts_onRequestGet } from "/home/diop/Projets/learn-dev-e-commerce/bubaaxbi/aminata-diop/functions/api/sections.ts"
import { onRequestGet as __api_settings_ts_onRequestGet } from "/home/diop/Projets/learn-dev-e-commerce/bubaaxbi/aminata-diop/functions/api/settings.ts"
import { onRequest as ___middleware_ts_onRequest } from "/home/diop/Projets/learn-dev-e-commerce/bubaaxbi/aminata-diop/functions/_middleware.ts"

export const routes = [
    {
      routePath: "/api/admin/links",
      mountPath: "/api/admin",
      method: "DELETE",
      middlewares: [],
      modules: [__api_admin_links_ts_onRequestDelete],
    },
  {
      routePath: "/api/admin/links",
      mountPath: "/api/admin",
      method: "POST",
      middlewares: [],
      modules: [__api_admin_links_ts_onRequestPost],
    },
  {
      routePath: "/api/admin/links",
      mountPath: "/api/admin",
      method: "PUT",
      middlewares: [],
      modules: [__api_admin_links_ts_onRequestPut],
    },
  {
      routePath: "/api/admin/login",
      mountPath: "/api/admin",
      method: "POST",
      middlewares: [],
      modules: [__api_admin_login_ts_onRequestPost],
    },
  {
      routePath: "/api/admin/projects",
      mountPath: "/api/admin",
      method: "DELETE",
      middlewares: [],
      modules: [__api_admin_projects_ts_onRequestDelete],
    },
  {
      routePath: "/api/admin/projects",
      mountPath: "/api/admin",
      method: "POST",
      middlewares: [],
      modules: [__api_admin_projects_ts_onRequestPost],
    },
  {
      routePath: "/api/admin/projects",
      mountPath: "/api/admin",
      method: "PUT",
      middlewares: [],
      modules: [__api_admin_projects_ts_onRequestPut],
    },
  {
      routePath: "/api/admin/sections",
      mountPath: "/api/admin",
      method: "PUT",
      middlewares: [],
      modules: [__api_admin_sections_ts_onRequestPut],
    },
  {
      routePath: "/api/admin/settings",
      mountPath: "/api/admin",
      method: "PUT",
      middlewares: [],
      modules: [__api_admin_settings_ts_onRequestPut],
    },
  {
      routePath: "/api/links",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_links_ts_onRequestGet],
    },
  {
      routePath: "/api/projects",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_projects_ts_onRequestGet],
    },
  {
      routePath: "/api/sections",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_sections_ts_onRequestGet],
    },
  {
      routePath: "/api/settings",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_settings_ts_onRequestGet],
    },
  {
      routePath: "/",
      mountPath: "/",
      method: "",
      middlewares: [___middleware_ts_onRequest],
      modules: [],
    },
  ]