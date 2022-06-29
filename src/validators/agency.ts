class AgencyValidator {
  public agency: string;
  public errors: string;

  constructor(agency: string) {
    this.agency = this.validator(agency);
    this.errors = '';
  };

  private validator(agency: string): string {
    if(!agency) {
      this.errors += '[Agency]: Agency is required.|';
      return '';
    };

    if(agency.trim().length < 3) {
      this.errors += '[Agency]: Agency must have at least 3 characters.|';
      return '';
    };

    if(!agency.trim) {
      this.errors += '[Agency]: Agency cannot be null|';
      return '';
    };

    return agency.trim();
  };
};
