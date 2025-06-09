import { NgFor, NgForOf, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-items',
  standalone: true,
  imports: [NgIf, NgFor, NgForOf, RouterModule],
  templateUrl: './nav-items.component.html',
  styleUrl: './nav-items.component.css',
})
export class NavItemsComponent {
  navItemsData = [
    {
      name: 'Phim Bộ',
      slug: 'phim-bo',
    },
    {
      name: 'Phim Lẻ',
      slug: 'phim-le',
    },
    {
      name: 'TV Shows',
      slug: 'tv-shows',
    },
    {
      name: 'Hoạt Hình',
      slug: 'hoat-hinh',
    },
    {
      name: 'Sắp Chiếu',
      slug: 'phim-sap-chieu',
    },
    {
      name: 'Phim Vietsub',
      slug: 'phim-vietsub',
    },
    {
      name: 'Thuyết Minh',
      slug: 'phim-thuyet-minh',
    },
    {
      name: 'Lồng Tiếng',
      slug: 'phim-long-tieng',
    },
    {
      name: 'Đang Chiếu',
      slug: 'phim-bo-dang-chieu',
    },
    {
      name: 'Trọn Bộ',
      slug: 'phim-bo-hoan-thanh',
    },
  ];

  genreItemsData = [
    {
      name: 'Hành Động',
      slug: 'hanh-dong',
    },
    {
      name: 'Tình Cảm',
      slug: 'tinh-cam',
    },
    {
      name: 'Hài Hước',
      slug: 'hai-huoc',
    },
    {
      name: 'Cổ Trang',
      slug: 'co-trang',
    },
    {
      name: 'Tâm Lý',
      slug: 'tam-ly',
    },
    {
      name: 'Hình Sự',
      slug: 'hinh-su',
    },
    {
      name: 'Chiến Tranh',
      slug: 'chien-tranh',
    },
    {
      name: 'Thể Thao',
      slug: 'the-thao',
    },
    {
      name: 'Võ Thuât',
      slug: 'vo-thuat',
    },
    {
      name: 'Viễn Tưởng',
      slug: 'vien-tuong',
    },
    {
      name: 'Phiêu Lưu',
      slug: 'phieu-luu',
    },
    {
      name: 'Khoa Học',
      slug: 'khoa-hoc',
    },
    {
      name: 'Kinh Dị',
      slug: 'kinh-di',
    },
    {
      name: 'Âm Nhạc',
      slug: 'am-nhac',
    },
    {
      name: 'Thần Thoại',
      slug: 'than-thoai',
    },
    {
      name: 'Tài Liệu',
      slug: 'tai-lieu',
    },
    {
      name: 'Gia Đình',
      slug: 'gia-dinh',
    },
    {
      name: 'Chính Kịch',
      slug: 'chinh-kich',
    },
    {
      name: 'Bí Ẩn',
      slug: 'bi-an',
    },
    {
      name: 'Học Đường',
      slug: 'hoc-duong',
    },
    {
      name: 'Kinh Điển',
      slug: 'kinh-dien',
    },
    {
      name: 'Phim 18+',
      slug: 'phim-18',
    },
  ];

  nationItemsData = [
    {
      name: 'Trung Quốc',
      slug: 'trung-quoc',
    },
    {
      name: 'Hàn Quốc',
      slug: 'han-quoc',
    },
    {
      name: 'Nhật Bản',
      slug: 'nhat-ban',
    },
    {
      name: 'Thái Lan',
      slug: 'thai-lan',
    },
    {
      name: 'Âu Mỹ',
      slug: 'au-my',
    },
    {
      name: 'Đài Loan',
      slug: 'dai-loan',
    },
    {
      name: 'Hồng Kông',
      slug: 'hong-kong',
    },
    {
      name: 'Ấn Độ',
      slug: 'an-do',
    },
    {
      name: 'Anh',
      slug: 'anh',
    },
    {
      name: 'Pháp',
      slug: 'phap',
    },
    {
      name: 'Canada',
      slug: 'canada',
    },
    {
      name: 'Đức',
      slug: 'duc',
    },
    {
      name: 'Tây Ban Nha',
      slug: 'tay-ban-nha',
    },
    {
      name: 'Thổ Nhĩ Kỳ',
      slug: 'tho-nhi-ky',
    },
    {
      name: 'Hà Lan',
      slug: 'ha-lan',
    },
    {
      name: 'Indonesia',
      slug: 'indonesia',
    },
    {
      name: 'Nga',
      slug: 'nga',
    },
    {
      name: 'Mexico',
      slug: 'mexico',
    },
    {
      name: 'Ba Lan',
      slug: 'ba-lan',
    },
    {
      name: 'Úc',
      slug: 'uc',
    },
    {
      name: 'Thụy Điển',
      slug: 'thuy-dien',
    },
    {
      name: 'Malaysia',
      slug: 'malaysia',
    },
    {
      name: 'Brazil',
      slug: 'brazil',
    },
    {
      name: 'Philippines',
      slug: 'philippines',
    },
    {
      name: 'Bồ Đào Nha',
      slug: 'bo-dao-nha',
    },
    {
      name: 'Ý',
      slug: 'y',
    },
    {
      name: 'Đan Mạch',
      slug: 'dan-mach',
    },
    {
      name: 'UAE',
      slug: 'uae',
    },
    {
      name: 'Na Uy',
      slug: 'na-uy',
    },
    {
      name: 'Thụy Sỹ',
      slug: 'thuy-sy',
    },
    {
      name: 'Châu Phi',
      slug: 'chau-phi',
    },
    {
      name: 'Nam Phi',
      slug: 'nam-phi',
    },
    {
      name: 'Ukraina',
      slug: 'ukraina',
    },
    {
      name: 'Ả Rập Xê Út',
      slug: 'a-rap-xe-ut',
    },
    {
      name: 'Quốc Gia Khác',
      slug: 'quoc-gia-khac',
    },
  ];

  @Input() isMobileTablet = false;

  openCatModal = false;
  openGenreModal = false;
  openNationModal = false;

  toggleCatModal() {
    this.openCatModal = !this.openCatModal;
    this.openGenreModal = false;
    this.openNationModal = false;
  }

  toggleGenreModal() {
    this.openGenreModal = !this.openGenreModal;
    this.openCatModal = false;
    this.openNationModal = false;
  }

  toggleNationModal() {
    this.openNationModal = !this.openNationModal;
    this.openCatModal = false;
    this.openGenreModal = false;
  }
}
