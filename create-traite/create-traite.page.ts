import { Component, OnInit } from '@angular/core';
import { TraitesService } from './../../provider/traites.service';
import { Storage } from '@ionic/storage';
import { IonicSelectableComponent } from 'ionic-selectable';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-create-traite',
  templateUrl: './create-traite.page.html',
  styleUrls: ['./create-traite.page.scss'],
})
export class CreateTraitePage implements OnInit {

	data = {societe_id:'', tab:[], total:0, limite:0, priorite:0, assiette:0, pmd:'', traite:0, typeTraite:'', branche:0, groupeBranche:'', zonerisque_id:0};
	public anArray:any=[];
	societes: any;
	traites: any;
	zones: any;
	public traite = '';
	public branche = '';
	branches: any;
	public r1 = 'Proportionnel';
	public r2 = 'Non-Proportionnel';
	public b1 = 'Marine';
	public b2 = 'Non-Marine';
	public id = 1;
	public tauxControl = 0;
	constructor(public alertController: AlertController,
  				private route: ActivatedRoute, 
  				private router: Router,
  				private storage: Storage,
				public traitesService: TraitesService) { }

	ngOnInit() {
		this.getDataStorage();
		this.traitesService.getSocietes()
		  .subscribe(data => {
			  this.societes = data['societe'];	

		  }, err=>{
			  console.log(err);
		  });
		  
		this.traitesService.getTraites()
		  .subscribe(data => {
			  this.traites = data['traite'];	

		  }, err=>{
			  console.log(err);
		  });
		  
		this.traitesService.getZones()
		  .subscribe(data => {
			  this.zones = data['zone'];	

		  }, err=>{
			  console.log(err);
		  });
		  
		this.traitesService.getBranches(this.id,"getBranches/")
		  .then((result) => {
			  if(result['branche']){
				this.branches = result['branche'];
			  }
			  else{
			  }
		  })
		  .catch((err)=>{
			  console.log(err);
		});  
		 
		this.data.typeTraite = this.r1; 
		this.data.groupeBranche = this.b1; 
	}
	
	getDataStorage(){
		this.storage.get('infos').then((val) => {
			
			//this.data.user_id = val.infos.user_id;
			this.data.societe_id = val.infos.societe_id;
			});
			
	}
  
	async societeChange(event: {
		component: IonicSelectableComponent,
		value: any 
		}) {
		/*this.data.compagnie	=	event.value.societe_id;
		console.log(this.data.compagnie);*/
	}
	async getBranches(id){
		await this.traitesService.getBranches(id,"getBranches/")
		  .then((result) => {
			  if(result['branche']){
				this.branches = result['branche'];
				console.log(this.branches);
			  }
			  else{
			  }
		  })
		  .catch((err)=>{
			  console.log(err);
		});
	}
		
	goTo(){
	   console.log('this.anArray',this.anArray);
	}
	
	Add(){
	   this.anArray.push({'compagnie':'', 'taux':0});
	}
	
	async controlTaux(e){
		this.anArray.forEach(function (value) {
		});
		this.data.tab = this.anArray;	
		this.calcul(this.data.tab);
		
	}
	
	async calcul(taille){
		this.tauxControl = 0;
		for(var i = 0;  i< taille.length; i++){
			this.tauxControl +=  this.data.tab[i].taux;
			console.log(this.data.tab[i].taux);
			if(this.tauxControl > 100){
				this.data.tab[i].taux = 0;
			}
		}
	}
	
	deleted(){
	   this.anArray.pop({'compagnie':'', 'taux':0});
	} 
	async sendData(){
		this.data.tab = this.anArray;
	}
	
	async zoneChange(event: {
		component: IonicSelectableComponent,
		value: any 
		}) {
		this.data.zonerisque_id	=	event.value.zonerisque_id;
	}
	
	async capaciteChange(event: {
		component: IonicSelectableComponent,
		value: any 
		}) {
		this.data.traite	=	event.value.capacite_id;
	}
	
	async brancheChange(event: {
		component: IonicSelectableComponent,
		value: any 
		}) {
		this.data.branche	=	event.value.branche_id;
	}
	
	async createTraites(){
		this.data.tab = this.anArray;
		await this.traitesService.addTraites(this.data,"addTraites")
		  .then((result) => {			
			  if(result['message']){
				
			  }           
		  })
		  .catch((err)=>{
			  console.log(err);
		  });
	}
	
	async addTraite(event){		
		this.data.total = this.data.limite + this.data.priorite;
	}
	
	async addTraite1(event){
		this.data.total = this.data.limite + this.data.priorite;
	}
	
	async displayType() {
    const alert = await this.alertController.create({
      header: 'Type de traité',
      inputs: [
        {
          name: 'retro1',
          type: 'radio',
          label: 'Proportionnel',
          value: this.r1
          //checked: true
        },
        {
          name: 'radio2',
          type: 'radio',
          label: 'Non-Proportionnel',
          value: this.r2
		  //checked: false
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
			this.data.typeTraite = data;
			
          }
        }
      ]
    });

    await alert.present();
  }
  
  async displayGroupe(event) {
    const alert = await this.alertController.create({
      header: 'Type de traité',
      inputs: [
        {
          name: 'b1',
          type: 'radio',
          label: 'Marine',
          value: this.b1,
          checked: true
        },
        {
          name: 'b2',
          type: 'radio',
          label: 'Non-Marine',
          value: this.b2
		  //checked: false
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
			this.data.groupeBranche = data;
			if(this.data.groupeBranche == this.b1){
				this.id = 1;
			}
			else{
				this.id = 2;
			}
			this.branche = '';
			console.log('branche '+this.branche);
			this.getBranches(this.id);
			
          }
        }
      ]
    });

    await alert.present();
  }
}
