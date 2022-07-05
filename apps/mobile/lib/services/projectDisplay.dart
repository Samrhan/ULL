
class ProjectDisplay{
  String? projectId;
  String name;
  String projectDate;
  String description;
  int amountOfPeople;
  String number;
  String street;
  String city;
  String? complement;
  String postal_code;
  String image;
  String state;

  /*export enum ProjectState {
    draft = 'draft',
    pending_validation = 'pending_validation',
    replacement = 'replacement',
    pending_payment = 'pending_payment',
    paid = 'paid',
  }*/

  ProjectDisplay(
      this.projectId,
      this.name,
      this.projectDate,
      this.description,
      this.amountOfPeople,
      this.number,
      this.street,
      this.city,
      this.complement,
      this.postal_code,
      this.image,
      this.state
      );



}
