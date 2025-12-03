import dynamic from "next/dynamic";



export const Column = dynamic(
  () => import("primereact/column").then((mod) => mod.Column),
  { ssr: false }
);
export const IconField = dynamic(
  () => import("primereact/iconfield").then((mod) => mod.IconField),
  { ssr: false }
);
export const DataTable = dynamic(
  () => import("primereact/datatable").then((mod) => mod.DataTable),
  { ssr: false }
);
export const InputIcon = dynamic(
  () => import("primereact/inputicon").then((mod) => mod.InputIcon),
  { ssr: false }
);
export const InputText = dynamic(
  () => import("primereact/inputtext").then((mod) => mod.InputText),
  { ssr: false }
);
export const Sidebar = dynamic(
  () => import("primereact/sidebar").then((mod) => mod.Sidebar),
  { ssr: false }
);

export const Dropdown = dynamic(
  () => import("primereact/dropdown").then((mod) => mod.Dropdown),
  { ssr: false }
);
export const Dialog = dynamic(
  () => import("primereact/dialog").then((mod) => mod.Dialog),
  { ssr: false }
);
export const Carousel = dynamic(
  () => import("primereact/carousel").then((mod) => mod.Carousel),
  { ssr: false }
);
export const ToastBadge = dynamic(
  () => import("primereact/toast").then((mod) => mod.Toast),
  { ssr: false }
);
export const FloatLabel = dynamic(
  () => import("primereact/floatlabel").then((mod) => mod.FloatLabel),
  { ssr: false }
);
// import { RadioButton, RadioButtonChangeEvent } from "primereact/radiobutton";

export const RadioButton = dynamic(
  () => import("primereact/radiobutton").then((mod) => mod.RadioButton),
  { ssr: false }
);

// Define the function