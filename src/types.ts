export type TCountryJSON = {
  country: TCountry[];
};

export type TCountry = {
  country: string;
  abbreviation_3: string;
  abbreviation_2: string;
  value: number;
};

export type TCountryCount = TCountry & {
  count: number;
};

export type TCumulativeDistribution = {
  country: TCountry;
  cumulativeValue: number;
};

export type TGeoJSONFeature = {
  type: "Feature";
  properties: {
    featurecla: string;
    scalerank: number;
    labelrank: number;
    sovereignt: string;
    sov_a3: string;
    adm0_dif: number;
    level: number;
    type: string;
    tlc: string;
    admin: string;
    adm0_a3: string;
    geou_dif: number;
    geounit: string;
    gu_a3: string;
    su_dif: number;
    subunit: string;
    su_a3: string;
    brk_diff: number;
    name: string;
    name_long: string;
    brk_a3: string;
    brk_name: string;
    brk_group: string | null;
    abbrev: string;
    postal: string;
    formal_en: string;
    formal_fr: string | null;
    name_ciawf: string;
    note_adm0: string | null;
    note_brk: string | null;
    name_sort: string;
    name_alt: string | null;
    mapcolor7: number;
    mapcolor8: number;
    mapcolor9: number;
    mapcolor13: number;
    pop_est: number;
    pop_rank: number;
    pop_year: number;
    gdp_md: number;
    gdp_year: number;
    economy: string;
    income_grp: string;
    fips_10: string;
    iso_a2: string;
    iso_a2_eh: string;
    iso_a3: string;
    iso_a3_eh: string;
    iso_n3: string;
    iso_n3_eh: string;
    un_a3: string;
    wb_a2: string;
    wb_a3: string;
    woe_id: number;
    woe_id_eh: number;
    woe_note: string;
    adm0_iso: string;
    adm0_diff: string | null;
    adm0_tlc: string;
    adm0_a3_us: string;
    adm0_a3_fr: string;
    adm0_a3_ru: string;
    adm0_a3_es: string;
    adm0_a3_cn: string;
    adm0_a3_tw: string;
    adm0_a3_in: string;
    adm0_a3_np: string;
    adm0_a3_pk: string;
    adm0_a3_de: string;
    adm0_a3_gb: string;
    adm0_a3_br: string;
    adm0_a3_il: string;
    adm0_a3_ps: string;
    adm0_a3_sa: string;
    adm0_a3_eg: string;
    adm0_a3_ma: string;
    adm0_a3_pt: string;
    adm0_a3_ar: string;
    adm0_a3_jp: string;
    adm0_a3_ko: string;
    adm0_a3_vn: string;
    adm0_a3_tr: string;
    adm0_a3_id: string;
    adm0_a3_pl: string;
    adm0_a3_gr: string;
    adm0_a3_it: string;
    adm0_a3_nl: string;
    adm0_a3_se: string;
    adm0_a3_bd: string;
    adm0_a3_ua: string;
    adm0_a3_un: number;
    adm0_a3_wb: number;
    continent: string;
    region_un: string;
    subregion: string;
    region_wb: string;
    name_len: number;
    long_len: number;
    abbrev_len: number;
    tiny: number;
    homepart: number;
    min_zoom: number;
    min_label: number;
    max_label: number;
    label_x: number;
    label_y: number;
    ne_id: number;
    wikidataid: string;
    name_ar: string;
    name_bn: string;
    name_de: string;
    name_en: string;
    name_es: string;
    name_fa: string;
    name_fr: string;
    name_el: string;
    name_he: string;
    name_hi: string;
    name_hu: string;
    name_id: string;
    name_it: string;
    name_ja: string;
    name_ko: string;
    name_nl: string;
    name_pl: string;
    name_pt: string;
    name_ru: string;
    name_sv: string;
    name_tr: string;
    name_uk: string;
    name_ur: string;
    name_vi: string;
    name_zh: string;
    name_zht: string;
    fclass_iso: string;
    tlc_diff: string | null;
    fclass_tlc: string;
    fclass_us: string | null;
    fclass_fr: string | null;
    fclass_ru: string | null;
    fclass_es: string | null;
    fclass_cn: string | null;
    fclass_tw: string | null;
    fclass_in: string | null;
    fclass_np: string | null;
    fclass_pk: string | null;
    fclass_de: string | null;
    fclass_gb: string | null;
    fclass_br: string | null;
    fclass_il: string | null;
    fclass_ps: string | null;
    fclass_sa: string | null;
    fclass_eg: string | null;
    fclass_ma: string | null;
    fclass_pt: string | null;
    fclass_ar: string | null;
    fclass_jp: string | null;
    fclass_ko: string | null;
    fclass_vn: string | null;
    fclass_tr: string | null;
    fclass_id: string | null;
    fclass_pl: string | null;
    fclass_gr: string | null;
    fclass_it: string | null;
    fclass_nl: string | null;
    fclass_se: string | null;
    fclass_bd: string | null;
    fclass_ua: string | null;
    filename: string;
  };
  geometry: {
    type: "Polygon";
    coordinates: number[][][];
  };
};

export type TGeoJSON = {
  type: "FeatureCollection";
  features: TGeoJSONFeature[];
};
