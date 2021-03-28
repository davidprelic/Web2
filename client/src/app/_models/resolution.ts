import { Cause, ConstructionType, Material, Subcause } from "./enums";

export interface Resolution {
    id?: number;
    cause: Cause;
    subcause: Subcause;
    constructionType: ConstructionType;
    material: Material;
}