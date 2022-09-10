import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';
import { NgxGalleryOptions, NgxGalleryImage } from '@kolkov/ngx-gallery'

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {

  mem: Member;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private memberService:MembersService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.loadMember();
    this.galleryOptions=[
    {
      width:'500px',
      height:'500px',
      imagePercent: 100,
      thumbnailsColumns: 10,
      //imageAnimation: NgxGalleryAnimation.Slide,
      preview:false
    }];
    //this.galleryImages = this.getImages(); //this one won't work because we need the user to get into the images
  }

  loadMember(){
    this.memberService.getMember(this.route.snapshot.paramMap.get('username'))
        .subscribe({next:(m)=>{
                                this.mem=m;
                                const imageUrls = [];
                                //if (this.mem){
                                  //for (const photo of this.mem.photos){
                                  //  console.log(photo.url);
                                  //}
                                //}
                                //else{
                                  imageUrls.push({
                                    small: this.mem.photoUrl,
                                    medium: this.mem.photoUrl,
                                    big: this.mem.photoUrl,
                                  });
                                //}
                                //console.log('hello ' + this.mem.photos);
                              },
                    error:(e)=>{console.log(e)}});
    //this.galleryImages = this.getImages();
  }

  getImages():NgxGalleryImage[]{
    const imageUrls = [];
    console.log(this.mem);
    /*
    for (const photo of this.mem.photo){
      imageUrls.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url,
      });
    }*/
    return imageUrls;
  }

}
