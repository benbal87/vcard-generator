enum VCardType3AddressEnum {
  // DOM = "DOM", // to indicate a domestic delivery address
  // INTL = "INTL", // to indicate an international delivery address
  // POSTAL = "POSTAL", // to indicate a postal delivery address
  // PARCEL = "PARCEL", // to indicate a parcel delivery address
  HOME = 'HOME', // to indicate a delivery address for a residence
  WORK = 'WORK', // to indicate delivery address for a place of work
  PREF = 'PREF', // to indicate the preferred delivery address when more than
                 // one address is specified
}

export default VCardType3AddressEnum
