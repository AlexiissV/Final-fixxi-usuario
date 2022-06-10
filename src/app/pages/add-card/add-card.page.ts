import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Stripe } from '@awesome-cordova-plugins/stripe/ngx';
import { Card } from 'src/app/interfaces/interfaces';
import { LocalService } from 'src/app/services/local.service';
import { PostService } from 'src/app/services/post.service';
import { ActionSheetController, NavController, ModalController } from '@ionic/angular';
import { InfocvvPage } from '../infocvv/infocvv.page';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.page.html',
  styleUrls: ['./add-card.page.scss'],
})
export class AddCardPage {
  cardForm: FormGroup;
  todo: FormGroup;
  nns: string[]=[];
  cardNumber: AbstractControl;
  cardExpire: AbstractControl;
  cardCVC: AbstractControl;
  cardHolderName: AbstractControl;
  cardLogo: string = '';
  error: boolean= false; 

  constructor(private formBuilder: FormBuilder,
              private stripe: Stripe,
              private local: LocalService,
              private post: PostService,
              private navctrl: NavController,
              private modalctrl: ModalController) { 

              this.cardForm = this.formBuilder.group({
      cardNumber: [
        null,
        [
          Validators.required,
          Validators.maxLength(19),
          Validators.minLength(18),
        ],
      ],
      cardExpire: [
        null,
        [Validators.required, Validators.minLength(5), Validators.maxLength(5)],
      ],
      cardCVC: [
        null,
        [Validators.required, Validators.minLength(3), Validators.maxLength(4)],
      ],
      cardHolderName: [null, [Validators.required]],
    });

    this.cardNumber = this.cardForm.controls.cardNumber;
    this.cardExpire = this.cardForm.controls.cardExpire;
    this.cardCVC = this.cardForm.controls.cardCVC;
    this.cardHolderName = this.cardForm.controls.cardHolderName;
  }
  maskCardNumber(event) {
    let inputTxt = event.detail.value;
    inputTxt = inputTxt ? inputTxt.split(' ').join('') : '';
    inputTxt = inputTxt.length > 16 ? inputTxt.substring(0, 16) : inputTxt;
    this.cardNumber.setValue(this.maskStringCardNumber(inputTxt));

    const cardType = this.getCardType(this.cardNumber.value);
    this.cardLogo =
      'https://res.cloudinary.com/dqwudn0fq/image/upload/v1604747715/' +
      cardType +
      '.png';
  }

  maskStringCardNumber(inputTxt) {
    inputTxt = inputTxt.replace(/\D/g, '');
    inputTxt = inputTxt.replace(/(\d{4})(\d)/, '$1 $2');
    inputTxt = inputTxt.replace(/(\d{4})(\d)/, '$1 $2');
    inputTxt = inputTxt.replace(/(\d{4})(\d)/, '$1 $2');
    inputTxt = inputTxt.replace(/(\d{4})(\d)/, '$1 $2');
    return inputTxt;
  }

  maskCardCVC(event) {
    let inputTxt = event.detail.value;
    inputTxt = inputTxt ? inputTxt.split(' ').join('') : '';
    inputTxt = inputTxt.length > 4 ? inputTxt.substring(0, 4) : inputTxt;
    this.cardCVC.setValue(this.maskStringardCVC(inputTxt));
  }

  maskStringardCVC(inputTxt) {
    inputTxt = inputTxt.replace(/\D/g, '');
    inputTxt = inputTxt.replace(/(\d{4})(\d)/, '$1 $2');
    return inputTxt;
  }

  maskCardExpire(event) {
    let inputTxt: string = event.detail.value;    
    inputTxt = inputTxt ? inputTxt.split(' ').join('/') : '';
    inputTxt = inputTxt.length > 5 ? inputTxt.substring(0, 5) : inputTxt;
    this.cardExpire.setValue(this.maskStringExpire(inputTxt).replace(' ', '/'));
    if(inputTxt.length>=5){
      this.nns = inputTxt.split('/');;
    }
  }
  maskStringExpire(inputTxt) {
    inputTxt = inputTxt.replace(/\D/g, '');
    inputTxt = inputTxt.replace(/(\d{2})(\d)/, '$1 $2');
    inputTxt = inputTxt.replace(/(\d{2})(\d)/, '$1 $2');
    return inputTxt;
  }

  getCardType(currentCardValue: string) {
    // JCB
    let jcb_regex = new RegExp('^(?:2131|1800|35)[0-9]{0,}$'); // 2131, 1800, 35 (3528-3589)

    // American Express
    let amex_regex = new RegExp('^3[47][0-9]{0,}$'); // 34, 37

    // Diners Club
    let diners_regex = new RegExp('^3(?:0[0-59]{1}|[689])[0-9]{0,}$'); // 300-305, 309, 36, 38-39

    // Visa
    let visa_regex = new RegExp('^4[0-9]{0,}$'); //4

    // MasterCard
    let mastercard_regex = new RegExp(
      '^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[01]|2720)[0-9]{0,}$'
    ); // 2221-2720, 51-55

    // tslint:disable-next-line: max-line-length
    let maestro_regex = new RegExp('^(5[06789]|6)[0-9]{0,}$'); // always growing in the range: 60-69, started with / not something else, but starting 5 must be encoded as mastercard anyway

    // Discover
    let discover_regex = new RegExp(
      '^(6011|65|64[4-9]|62212[6-9]|6221[3-9]|622[2-8]|6229[01]|62292[0-5])[0-9]{0,}$'
    );
    // 6011, 622126-622925, 644-649, 65

    // get rid of anything but numbers
    currentCardValue = currentCardValue.replace(/\D/g, '');

    // checks per each, as their could be multiple hits
    // fix: ordering matter in detection, otherwise can give false results in rare cases
    let brand = '';
    if (currentCardValue.match(jcb_regex)) {
      brand = 'jcb';
    } else if (currentCardValue.match(amex_regex)) {
      brand = 'americanexpress';
    } else if (currentCardValue.match(diners_regex)) {
      brand = 'diners_club';
    } else if (currentCardValue.match(visa_regex)) {
      brand = 'visa';
    } else if (currentCardValue.match(mastercard_regex)) {
      brand = 'mastercard';
    } else if (currentCardValue.match(discover_regex)) {
      brand = 'discover';
    } else if (currentCardValue.match(maestro_regex)) {
      if (currentCardValue[0] == '5') {
        // started 5 must be mastercard
        brand = 'mastercard';
      } else {
        brand = 'maestro'; // maestro is all 60-69 which is not something else, thats why this condition in the end
      }
    }
    return brand;
  }

  validarTarjeta(){
    if(this.cardNumber.valid){
      this.stripe.validateCardNumber(this.cardNumber.value)
      .then( resp => {
        if(this.error){
          this.error=false;
        }
      }).catch(error =>{
        if(!this.error){
        error= true;
        }
      });

    }
  }
  validarfecha(){
    if(this.cardExpire.valid){
    this.stripe.validateExpiryDate('' + this.nns[0], '' + this.nns[1]).then(resp => {
          if(this.error){
          this.error=false;
        }
    }).catch(error => {
         if(!this.error){
        error= true;
        }
      
      
    });
  }
  }

  async payWithStripe() {
    await this.local.presentLoading('Cargando..!')
   const  card = {
      number: this.cardNumber.value, // 16-digit credit card number
      expMonth: Number(this.nns[0]), // expiry month
      expYear: Number(this.nns[1]), // expiry year
      cvc: this.cardCVC.value, // CVC / CCV
      name: this.cardHolderName.value, // card holder name (optional)
    };
    
    this.stripe.setPublishableKey('pk_live_51K2ky5Et4XWoEf0ggTRi0Pya8cbkBdOjdOZfgc8ZPWlJMckuSc4WQ15iziu4JIXftvduUXlSWps9su6Z915JuWQw001vqKJZ7D')
   // this.stripe.setPublishableKey('pk_test_knsF0CgbFzfPpkUlr81JxUqp')
    .then(rep => {
    });
    this.stripe.createCardToken(card)
      .then(async token => {
        this.enviardata(token.id)
      })
      .catch(error => {
        console.error(error);
        this.local.detenerloadding();
        this.local.presentAlert('Información de Tarjeta invalida');
      });
  }
  async enviardata(id: string) {
   await this.post.enviartoken(id).subscribe( async resp =>{
      await this.local.detenerloadding();
      this.local.presentAlert(resp.message);
      if(resp.code ==202){
        this.cardNumber.setValue(null);
        this.cardExpire.setValue('');
        this.cardCVC.setValue(null);
        this.cardHolderName.setValue('');
        this.navctrl.back()

      }
    }, (error) =>{
      this.local.detenerloadding();
    });
  }
  async eliminar(item: Card){
    await this.local.presentLoading('Eliminando...');
    this.post.eliminartarjeta(item.id)
    .subscribe(async resp => {
      await this.local.detenerloadding();
      if(resp.code ==202){
        this.navctrl.back()
      }else{
        this.local.presentAlert(resp.message);
      }

      
    }, async (error) => {
      await this.local.detenerloadding();
    });

  }
  async viewcvv(){
    const modal = await this.modalctrl.create({
      component: InfocvvPage,
      backdropDismiss:false,
      cssClass:'info-cvv'
    });
    await modal.present();
  }
}
