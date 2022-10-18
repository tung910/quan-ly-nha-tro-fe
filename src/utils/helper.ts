import moment from 'moment';
import { useLocation } from 'react-router-dom';
import { MotelType } from '~/types/MotelType';
import { RoomType } from '~/types/RoomType';
import { IUser } from '~/types/User.type';
import { DateFormat } from '~/constants/const';

const generatePriceToVND = (
    price?: number,
    option?: Intl.NumberFormatOptions
) => {
    if (!option) {
        return price?.toLocaleString('vi');
    }
    if (!price) {
        return '';
    }
    return price?.toLocaleString('vi', {
        currency: 'VND',
        style: 'currency',
    });
};
const generateFileToBase64 = (
    file: any,
    callback: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>
) => {
    file.preview = URL.createObjectURL(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
        callback(reader?.result);
    };
};
const convertDate = (date: any, format = DateFormat.DATE_DEFAULT) => {
    return moment(date).format(format);
};
const useGetParam = (param: string) => {
    const { search } = useLocation();
    const result = new URLSearchParams(search).get(param) || '';
    return [result];
};
const exportHtmlToWord = (data: {
    lessor: IUser;
    motelRoom: RoomType;
    roomRentalDetail: any;
    motel: MotelType;
}) => {
    const { lessor, motelRoom, roomRentalDetail, motel } = data;
    const sourceHTML = `<html
	xmlns:v="urn:schemas-microsoft-com:vml"
	xmlns:o="urn:schemas-microsoft-com:office:office"
	xmlns:w="urn:schemas-microsoft-com:office:word"
	xmlns:m="http://schemas.microsoft.com/office/2004/12/omml"
	xmlns="http://www.w3.org/TR/REC-html40"
>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=unicode" />
		<meta name="ProgId" content="Word.Document" />
		<meta name="Generator" content="Microsoft Word 15" />
		<meta name="Originator" content="Microsoft Word 15" />
		<link rel="File-List" href="abcd_files/filelist.xml" />
		<title>Nha Tro Vuong Anh</title>
		<style>
			 @font-face
				{font-family:Wingdings;
				panose-1:5 0 0 0 0 0 0 0 0 0;
				mso-font-charset:2;
				mso-generic-font-family:auto;
				mso-font-pitch:variable;
				mso-font-signature:0 268435456 0 0 -2147483648 0;}
			@font-face
				{font-family:"Cambria Math";
				panose-1:2 4 5 3 5 4 6 3 2 4;
				mso-font-charset:0;
				mso-generic-font-family:roman;
				mso-font-pitch:variable;
				mso-font-signature:3 0 0 0 1 0;}
			 /* Style Definitions */
			 p.MsoNormal, li.MsoNormal, div.MsoNormal
				{mso-style-unhide:no;
				mso-style-qformat:yes;
				mso-style-parent:"";
				margin:0cm;
				mso-pagination:widow-orphan;
				font-size:12.0pt;
				font-family:"Times New Roman",serif;
				mso-fareast-font-family:"Times New Roman";
				mso-fareast-theme-font:minor-fareast;}
			a:link, span.MsoHyperlink
				{mso-style-noshow:yes;
				mso-style-priority:99;
				color:blue;
				text-decoration:underline;
				text-underline:single;}
			a:visited, span.MsoHyperlinkFollowed
				{mso-style-noshow:yes;
				mso-style-priority:99;
				color:purple;
				text-decoration:underline;
				text-underline:single;}
			p
				{mso-style-noshow:yes;
				mso-style-priority:99;
				mso-margin-top-alt:auto;
				margin-right:0cm;
				mso-margin-bottom-alt:auto;
				margin-left:0cm;
				mso-pagination:widow-orphan;
				font-size:12.0pt;
				font-family:"Times New Roman",serif;
				mso-fareast-font-family:"Times New Roman";
				mso-fareast-theme-font:minor-fareast;}
			p.msonormal0, li.msonormal0, div.msonormal0
				{mso-style-name:msonormal;
				mso-style-noshow:yes;
				mso-style-priority:99;
				mso-style-unhide:no;
				mso-margin-top-alt:auto;
				margin-right:0cm;
				mso-margin-bottom-alt:auto;
				margin-left:0cm;
				mso-pagination:widow-orphan;
				font-size:12.0pt;
				font-family:"Times New Roman",serif;
				mso-fareast-font-family:"Times New Roman";
				mso-fareast-theme-font:minor-fareast;}
			span.SpellE
				{mso-style-name:"";
				mso-spl-e:yes;}
			span.GramE
				{mso-style-name:"";
				mso-gram-e:yes;}
			.MsoChpDefault
				{mso-style-type:export-only;
				mso-default-props:yes;
				font-size:10.0pt;
				mso-ansi-font-size:10.0pt;
				mso-bidi-font-size:10.0pt;}
			@page WordSection1
				{size:612.0pt 792.0pt;
				margin:57.6pt 72.0pt 57.6pt 72.0pt;
				mso-header-margin:36.0pt;
				mso-footer-margin:36.0pt;
				mso-paper-source:0;}
			div.WordSection1
				{page:WordSection1;}
			 /* List Definitions */
			 @list l0
				{mso-list-id:5714517;
				mso-list-template-ids:957926690;}
			@list l0:level1
				{mso-level-number-format:bullet;
				mso-level-text:;
				mso-level-tab-stop:36.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:Symbol;}
			@list l0:level2
				{mso-level-number-format:bullet;
				mso-level-text:o;
				mso-level-tab-stop:72.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:"Courier New";
				mso-bidi-font-family:"Times New Roman";}
			@list l0:level3
				{mso-level-number-format:bullet;
				mso-level-text:;
				mso-level-tab-stop:108.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:Wingdings;}
			@list l0:level4
				{mso-level-number-format:bullet;
				mso-level-text:;
				mso-level-tab-stop:144.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:Wingdings;}
			@list l0:level5
				{mso-level-number-format:bullet;
				mso-level-text:;
				mso-level-tab-stop:180.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:Wingdings;}
			@list l0:level6
				{mso-level-number-format:bullet;
				mso-level-text:;
				mso-level-tab-stop:216.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:Wingdings;}
			@list l0:level7
				{mso-level-number-format:bullet;
				mso-level-text:;
				mso-level-tab-stop:252.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:Wingdings;}
			@list l0:level8
				{mso-level-number-format:bullet;
				mso-level-text:;
				mso-level-tab-stop:288.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:Wingdings;}
			@list l0:level9
				{mso-level-number-format:bullet;
				mso-level-text:;
				mso-level-tab-stop:324.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:Wingdings;}
			@list l1
				{mso-list-id:663044915;
				mso-list-template-ids:-1893564628;}
			@list l1:level1
				{mso-level-number-format:bullet;
				mso-level-text:;
				mso-level-tab-stop:36.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:Symbol;}
			@list l1:level2
				{mso-level-number-format:bullet;
				mso-level-text:o;
				mso-level-tab-stop:72.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:"Courier New";
				mso-bidi-font-family:"Times New Roman";}
			@list l1:level3
				{mso-level-number-format:bullet;
				mso-level-text:;
				mso-level-tab-stop:108.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:Wingdings;}
			@list l1:level4
				{mso-level-number-format:bullet;
				mso-level-text:;
				mso-level-tab-stop:144.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:Wingdings;}
			@list l1:level5
				{mso-level-number-format:bullet;
				mso-level-text:;
				mso-level-tab-stop:180.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:Wingdings;}
			@list l1:level6
				{mso-level-number-format:bullet;
				mso-level-text:;
				mso-level-tab-stop:216.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:Wingdings;}
			@list l1:level7
				{mso-level-number-format:bullet;
				mso-level-text:;
				mso-level-tab-stop:252.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:Wingdings;}
			@list l1:level8
				{mso-level-number-format:bullet;
				mso-level-text:;
				mso-level-tab-stop:288.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:Wingdings;}
			@list l1:level9
				{mso-level-number-format:bullet;
				mso-level-text:;
				mso-level-tab-stop:324.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:Wingdings;}
			@list l2
				{mso-list-id:813906759;
				mso-list-template-ids:-1835519156;}
			@list l2:level1
				{mso-level-number-format:bullet;
				mso-level-text:;
				mso-level-tab-stop:36.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:Symbol;}
			@list l2:level2
				{mso-level-number-format:bullet;
				mso-level-text:o;
				mso-level-tab-stop:72.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:"Courier New";
				mso-bidi-font-family:"Times New Roman";}
			@list l2:level3
				{mso-level-number-format:bullet;
				mso-level-text:;
				mso-level-tab-stop:108.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:Wingdings;}
			@list l2:level4
				{mso-level-number-format:bullet;
				mso-level-text:;
				mso-level-tab-stop:144.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:Wingdings;}
			@list l2:level5
				{mso-level-number-format:bullet;
				mso-level-text:;
				mso-level-tab-stop:180.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:Wingdings;}
			@list l2:level6
				{mso-level-number-format:bullet;
				mso-level-text:;
				mso-level-tab-stop:216.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:Wingdings;}
			@list l2:level7
				{mso-level-number-format:bullet;
				mso-level-text:;
				mso-level-tab-stop:252.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:Wingdings;}
			@list l2:level8
				{mso-level-number-format:bullet;
				mso-level-text:;
				mso-level-tab-stop:288.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:Wingdings;}
			@list l2:level9
				{mso-level-number-format:bullet;
				mso-level-text:;
				mso-level-tab-stop:324.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:Wingdings;}
			@list l3
				{mso-list-id:864635239;
				mso-list-template-ids:1598305798;}
			@list l3:level1
				{mso-level-number-format:bullet;
				mso-level-text:;
				mso-level-tab-stop:36.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:Symbol;}
			@list l3:level2
				{mso-level-number-format:bullet;
				mso-level-text:o;
				mso-level-tab-stop:72.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:"Courier New";
				mso-bidi-font-family:"Times New Roman";}
			@list l3:level3
				{mso-level-number-format:bullet;
				mso-level-text:;
				mso-level-tab-stop:108.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:Wingdings;}
			@list l3:level4
				{mso-level-number-format:bullet;
				mso-level-text:;
				mso-level-tab-stop:144.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:Wingdings;}
			@list l3:level5
				{mso-level-number-format:bullet;
				mso-level-text:;
				mso-level-tab-stop:180.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:Wingdings;}
			@list l3:level6
				{mso-level-number-format:bullet;
				mso-level-text:;
				mso-level-tab-stop:216.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:Wingdings;}
			@list l3:level7
				{mso-level-number-format:bullet;
				mso-level-text:;
				mso-level-tab-stop:252.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:Wingdings;}
			@list l3:level8
				{mso-level-number-format:bullet;
				mso-level-text:;
				mso-level-tab-stop:288.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:Wingdings;}
			@list l3:level9
				{mso-level-number-format:bullet;
				mso-level-text:;
				mso-level-tab-stop:324.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:Wingdings;}
			@list l4
				{mso-list-id:1353799827;
				mso-list-template-ids:-1553592572;}
			@list l4:level1
				{mso-level-number-format:bullet;
				mso-level-text:;
				mso-level-tab-stop:36.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:Symbol;}
			@list l4:level2
				{mso-level-number-format:bullet;
				mso-level-text:o;
				mso-level-tab-stop:72.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:"Courier New";
				mso-bidi-font-family:"Times New Roman";}
			@list l4:level3
				{mso-level-number-format:bullet;
				mso-level-text:;
				mso-level-tab-stop:108.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:Wingdings;}
			@list l4:level4
				{mso-level-number-format:bullet;
				mso-level-text:;
				mso-level-tab-stop:144.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:Wingdings;}
			@list l4:level5
				{mso-level-number-format:bullet;
				mso-level-text:;
				mso-level-tab-stop:180.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:Wingdings;}
			@list l4:level6
				{mso-level-number-format:bullet;
				mso-level-text:;
				mso-level-tab-stop:216.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:Wingdings;}
			@list l4:level7
				{mso-level-number-format:bullet;
				mso-level-text:;
				mso-level-tab-stop:252.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:Wingdings;}
			@list l4:level8
				{mso-level-number-format:bullet;
				mso-level-text:;
				mso-level-tab-stop:288.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:Wingdings;}
			@list l4:level9
				{mso-level-number-format:bullet;
				mso-level-text:;
				mso-level-tab-stop:324.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:Wingdings;}
			@list l5
				{mso-list-id:1616863490;
				mso-list-template-ids:-1690037512;}
			@list l5:level1
				{mso-level-number-format:bullet;
				mso-level-text:;
				mso-level-tab-stop:36.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:Symbol;}
			@list l5:level2
				{mso-level-number-format:bullet;
				mso-level-text:o;
				mso-level-tab-stop:72.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:"Courier New";
				mso-bidi-font-family:"Times New Roman";}
			@list l5:level3
				{mso-level-number-format:bullet;
				mso-level-text:;
				mso-level-tab-stop:108.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:Wingdings;}
			@list l5:level4
				{mso-level-number-format:bullet;
				mso-level-text:;
				mso-level-tab-stop:144.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:Wingdings;}
			@list l5:level5
				{mso-level-number-format:bullet;
				mso-level-text:;
				mso-level-tab-stop:180.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:Wingdings;}
			@list l5:level6
				{mso-level-number-format:bullet;
				mso-level-text:;
				mso-level-tab-stop:216.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:Wingdings;}
			@list l5:level7
				{mso-level-number-format:bullet;
				mso-level-text:;
				mso-level-tab-stop:252.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:Wingdings;}
			@list l5:level8
				{mso-level-number-format:bullet;
				mso-level-text:;
				mso-level-tab-stop:288.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:Wingdings;}
			@list l5:level9
				{mso-level-number-format:bullet;
				mso-level-text:;
				mso-level-tab-stop:324.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:Wingdings;}
			@list l6
				{mso-list-id:1693336881;
				mso-list-template-ids:1821013932;}
			@list l6:level1
				{mso-level-number-format:bullet;
				mso-level-text:;
				mso-level-tab-stop:36.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:Symbol;}
			@list l6:level2
				{mso-level-number-format:bullet;
				mso-level-text:o;
				mso-level-tab-stop:72.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:"Courier New";
				mso-bidi-font-family:"Times New Roman";}
			@list l6:level3
				{mso-level-number-format:bullet;
				mso-level-text:;
				mso-level-tab-stop:108.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:Wingdings;}
			@list l6:level4
				{mso-level-number-format:bullet;
				mso-level-text:;
				mso-level-tab-stop:144.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:Wingdings;}
			@list l6:level5
				{mso-level-number-format:bullet;
				mso-level-text:;
				mso-level-tab-stop:180.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:Wingdings;}
			@list l6:level6
				{mso-level-number-format:bullet;
				mso-level-text:;
				mso-level-tab-stop:216.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:Wingdings;}
			@list l6:level7
				{mso-level-number-format:bullet;
				mso-level-text:;
				mso-level-tab-stop:252.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:Wingdings;}
			@list l6:level8
				{mso-level-number-format:bullet;
				mso-level-text:;
				mso-level-tab-stop:288.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:Wingdings;}
			@list l6:level9
				{mso-level-number-format:bullet;
				mso-level-text:;
				mso-level-tab-stop:324.0pt;
				mso-level-number-position:left;
				text-indent:-18.0pt;
				mso-ansi-font-size:10.0pt;
				font-family:Wingdings;}
			ol
				{margin-bottom:0cm;}
			ul
				{margin-bottom:0cm;}
			-->
		</style>
		<style>
			/* Style Definitions */
			table.MsoNormalTable {
				mso-style-name: 'Table Normal';
				mso-tstyle-rowband-size: 0;
				mso-tstyle-colband-size: 0;
				mso-style-noshow: yes;
				mso-style-priority: 99;
				mso-style-parent: '';
				mso-padding-alt: 0cm 5.4pt 0cm 5.4pt;
				mso-para-margin: 0cm;
				mso-pagination: widow-orphan;
				font-size: 10pt;
				font-family: 'Times New Roman', serif;
			}
		</style>
	</head>

	<body
		lang="VI"
		link="blue"
		vlink="purple"
		style="tab-interval: 36pt; word-wrap: break-word"
	>
		<div class="WordSection1">
			<p
				align="center"
				style="
					margin-top: 6pt;
					margin-right: 0cm;
					margin-bottom: 0cm;
					margin-left: 0cm;
					text-align: center;
					text-indent: 18pt;
					line-height: 115%;
				"
			>
				<span lang="EN-US" style="mso-ansi-language: EN-US"
					>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</span
				><span lang="EN-US"> </span
				><span lang="EN-US" style="mso-ansi-language: EN-US"><o:p></o:p></span>
			</p>

			<p
				align="center"
				style="
					margin-top: 6pt;
					margin-right: 0cm;
					margin-bottom: 0cm;
					margin-left: 0cm;
					text-align: center;
					text-indent: 18pt;
					line-height: 115%;
				"
			>
				<span class="SpellE"
					><span lang="EN-US" style="mso-ansi-language: EN-US">Độc</span></span
				><span lang="EN-US" style="mso-ansi-language: EN-US">
					<span class="SpellE">Lập</span> - <span class="SpellE">Tự</span> Do -
					<span class="SpellE">Hạnh</span>
					<span class="SpellE">Phúc</span></span
				><span lang="EN-US"> </span
				><span lang="EN-US" style="mso-ansi-language: EN-US"><o:p></o:p></span>
			</p>

			<p
				align="center"
				style="
					margin-top: 6pt;
					margin-right: 0cm;
					margin-bottom: 0cm;
					margin-left: 0cm;
					text-align: center;
					text-indent: 18pt;
					line-height: 115%;
				"
			>
				<span lang="EN-US" style="mso-ansi-language: EN-US"
					>---<span class="SpellE">oOo</span
					>---&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
				><span lang="EN-US"> </span
				><span lang="EN-US" style="mso-ansi-language: EN-US"><o:p></o:p></span>
			</p>

			<p
				align="center"
				style="
					margin-top: 6pt;
					margin-right: 0cm;
					margin-bottom: 6pt;
					margin-left: 0cm;
					text-align: center;
					text-indent: 18pt;
					line-height: 115%;
				"
			>
				<span lang="EN-US" style="mso-ansi-language: EN-US">&nbsp;&nbsp; </span
				><strong
					><span
						lang="EN-US"
						style="font-size: 16pt; line-height: 115%; mso-ansi-language: EN-US"
						>HỢP ĐỒNG CHO THUÊ PHÒNG TRỌ</span
					></strong
				><span lang="EN-US"> </span
				><span lang="EN-US" style="mso-ansi-language: EN-US"><o:p></o:p></span>
			</p>

			<p
				align="center"
				style="
					margin-top: 6pt;
					margin-right: 0cm;
					margin-bottom: 6pt;
					margin-left: 0cm;
					text-align: center;
					text-indent: 18pt;
					line-height: 115%;
				"
			>
				<span class="SpellE"
					><strong
						><span
							lang="EN-US"
							style="
								font-size: 14pt;
								line-height: 115%;
								mso-ansi-language: EN-US;
							"
							>Số</span
						></strong
					></span
				><strong
					><span
						lang="EN-US"
						style="font-size: 14pt; line-height: 115%; mso-ansi-language: EN-US"
						>:    <span class="SpellE">  Ngày</span>:
					</span></strong
				><span lang="EN-US" style="mso-ansi-language: EN-US"><o:p></o:p></span>
			</p>

			<p style="margin-left: 36pt">
				<span lang="EN-US" style="mso-ansi-language: EN-US"
					>-&nbsp;&nbsp; <span class="SpellE">Căn</span>
					<span class="SpellE">cứ</span> <span class="SpellE">Bộ</span>
					<span class="SpellE">luật</span> <span class="SpellE">dân</span>
					<span class="SpellE">sự</span> <span class="SpellE">của</span>
					<span class="SpellE">nước</span> <span class="SpellE">Cộng</span>
					<span class="SpellE">hoà</span> <span class="SpellE">xã</span>
					<span class="SpellE">hội</span> <span class="SpellE">chủ</span>
					<span class="SpellE">nghĩa</span> <span class="SpellE">Việt</span>
					<span class="SpellE">nam</span> <span class="SpellE">có</span>
					<span class="SpellE">hiệu</span> <span class="SpellE">lực</span>
					<span class="SpellE">từ</span>
					<span class="SpellE">ngày</span> 01/01/2006;</span
				><span lang="EN-US"> </span
				><span lang="EN-US" style="mso-ansi-language: EN-US"><o:p></o:p></span>
			</p>

			<p style="margin-left: 36pt">
				<span lang="EN-US" style="mso-ansi-language: EN-US"
					>-&nbsp;&nbsp; <span class="SpellE">Căn</span>
					<span class="SpellE">cứ</span> <span class="SpellE">nhu</span>
					<span class="SpellE">cầu</span> <span class="SpellE">và</span>
					<span class="SpellE">khả</span> <span class="SpellE">năng</span>
					<span class="SpellE">của</span> <span class="SpellE">hai</span>
					<span class="SpellE">bên</span>,</span
				><span lang="EN-US"> </span
				><span lang="EN-US" style="mso-ansi-language: EN-US"><o:p></o:p></span>
			</p>

			<p>
				<span class="SpellE"
					><em
						><span lang="EN-US" style="mso-ansi-language: EN-US">Hôm</span></em
					></span
				><em
					><span lang="EN-US" style="mso-ansi-language: EN-US">
						nay, <span class="SpellE"><span class="GramE">ngày</span></span
						><span class="GramE">
							<span class="MsoCommentReference"
								><span style="font-size: 8pt; font-style: normal"
									>&nbsp;</span
								></span
							><span class="SpellE">tháng</span></span
						>
					</span></em
				><span class="MsoCommentReference"
					><span lang="EN-US" style="font-size: 8pt; mso-ansi-language: EN-US"
						>&nbsp;</span
					></span
				><em
					><span lang="EN-US" style="mso-ansi-language: EN-US">
						<span class="SpellE">năm</span> <span class="SpellE">tại</span>
						<span class="SpellE">địa</span> <span class="SpellE">chỉ</span> 
                  ${motel.name}  ${motel.address} ${motel.district} 
                  ${motel.province},
						<span class="SpellE"> chúng</span> <span class="SpellE">tôi</span>
						<span class="SpellE">gồm</span>
						<span class="SpellE">có</span>:</span
					></em
				><span lang="EN-US"> </span
				><span lang="EN-US" style="mso-ansi-language: EN-US"><o:p></o:p></span>
			</p>

			<p
				style="
					margin-top: 1pt;
					margin-right: 0cm;
					margin-bottom: 1pt;
					margin-left: 0cm;
					line-height: 115%;
				"
			>
				<strong
					><u
						><span
							lang="EN-US"
							style="
								font-size: 13pt;
								line-height: 115%;
								color: #333333;
								background: white;
								mso-ansi-language: EN-US;
							"
							>BÊN <span class="GramE">A :</span> BÊN CHO THUÊ</span
						></u
					></strong
				><span lang="EN-US"> </span
				><span
					lang="EN-US"
					style="
						font-size: 11pt;
						line-height: 115%;
						font-family: 'Arial', sans-serif;
						color: black;
						mso-ansi-language: EN-US;
					"
					><o:p></o:p
				></span>
			</p>

			<p
				style="
					margin-top: 1pt;
					margin-right: 0cm;
					margin-bottom: 1pt;
					margin-left: 0cm;
					line-height: 115%;
				"
			>
				<span class="SpellE"
					><strong
						><span
							lang="EN-US"
							style="
								font-size: 13pt;
								line-height: 115%;
								color: black;
								background: white;
								mso-ansi-language: EN-US;
							"
							>Ông</span
						></strong
					></span
				><strong
					><span
						lang="EN-US"
						style="
							font-size: 13pt;
							line-height: 115%;
							color: black;
							background: white;
							mso-ansi-language: EN-US;
						"
						>/<span class="SpellE">bà</span></span
					></strong
				><span
					lang="EN-US"
					style="
						font-size: 13pt;
						line-height: 115%;
						color: black;
						background: white;
						mso-ansi-language: EN-US;
					"
					>: ${lessor?.name}
					<span class="GramE"
						> <span class="MsoCommentReference"
							><span
								style="font-size: 8pt; line-height: 115%; color: windowtext"
								>&nbsp;</span
							></span
						><strong> <span class="SpellE">Năm</span></strong></span
					><strong> <span class="SpellE">sinh</span></strong
					>: ${lessor?.dateOfBirth}</span
				><span
					lang="EN-US"
					style="
						font-size: 11pt;
						line-height: 115%;
						font-family: 'Arial', sans-serif;
						color: black;
						mso-ansi-language: EN-US;
					"
					><o:p></o:p
				></span>
			</p>

			<p
				style="
					margin-top: 1pt;
					margin-right: 0cm;
					margin-bottom: 1pt;
					margin-left: 0cm;
					line-height: 115%;
				"
			>
				<strong
					><span
						lang="EN-US"
						style="
							font-size: 13pt;
							line-height: 115%;
							color: black;
							background: white;
							mso-ansi-language: EN-US;
						"
						>CMND <span class="SpellE">số</span></span
					></strong
				><span
					lang="EN-US"
					style="
						font-size: 13pt;
						line-height: 115%;
						color: black;
						background: white;
						mso-ansi-language: EN-US;
					"
					>: ${lessor?.citizenIdentificationNumber}</span
				><span class="MsoCommentReference"
					><span
						lang="EN-US"
						style="font-size: 8pt; line-height: 115%; mso-ansi-language: EN-US"
						>&nbsp;</span
					></span
				><span class="SpellE"
					><strong
						><span
							lang="EN-US"
							style="
								font-size: 13pt;
								line-height: 115%;
								color: black;
								background: white;
								mso-ansi-language: EN-US;
							"
							>Ngày</span
						></strong
					></span
				><strong
					><span
						lang="EN-US"
						style="
							font-size: 13pt;
							line-height: 115%;
							color: black;
							background: white;
							mso-ansi-language: EN-US;
						"
					>
						<span class="SpellE">cấp</span>: ${lessor?.dateRange} </span
					></strong
				><span
					lang="EN-US"
					style="
						font-size: 13pt;
						line-height: 115%;
						color: black;
						background: white;
						mso-ansi-language: EN-US;
					"
				>
				</span
				><span class="MsoCommentReference"
					><span
						lang="EN-US"
						style="font-size: 8pt; line-height: 115%; mso-ansi-language: EN-US"
						>&nbsp;</span
					></span
				><span class="SpellE"
					><strong> <span
							lang="EN-US"
							style="
								font-size: 13pt;
								line-height: 115%;
								color: black;
								background: white;
								mso-ansi-language: EN-US;
							"
							>Nơi</span
						></strong
					></span
				><strong
					><span
						lang="EN-US"
						style="
							font-size: 13pt;
							line-height: 115%;
							color: black;
							background: white;
							mso-ansi-language: EN-US;
						"
					>
						<span class="SpellE">cấp</span>: ${lessor?.issuedBy}</span
					></strong
				><span
					lang="EN-US"
					style="
						font-size: 13pt;
						line-height: 115%;
						color: black;
						background: white;
						mso-ansi-language: EN-US;
					"
				>
				</span
				><span
					lang="EN-US"
					style="
						font-size: 11pt;
						line-height: 115%;
						font-family: 'Arial', sans-serif;
						color: black;
						mso-ansi-language: EN-US;
					"
					><o:p></o:p
				></span>
			</p>

			<p
				style="
					margin-top: 1pt;
					margin-right: 0cm;
					margin-bottom: 1pt;
					margin-left: 0cm;
					line-height: 115%;
				"
			>
				<span class="SpellE"
					><strong
						><span
							lang="EN-US"
							style="
								font-size: 13pt;
								line-height: 115%;
								color: black;
								background: white;
								mso-ansi-language: EN-US;
							"
							>Địa</span
						></strong
					></span
				><strong
					><span
						lang="EN-US"
						style="
							font-size: 13pt;
							line-height: 115%;
							color: black;
							background: white;
							mso-ansi-language: EN-US;
						"
					>
						<span class="SpellE">chỉ</span> <span class="SpellE">thường</span>
						<span class="SpellE">trú</span>:</span
					></strong
				><span
					lang="EN-US"
					style="
						font-size: 13pt;
						line-height: 115%;
						color: black;
						background: white;
						mso-ansi-language: EN-US;
					"
				>
				</span
				><a name="_msoanchor_12" id="_anchor_12"></a
				><span
					lang="EN-US"
					style="
						font-size: 11pt;
						line-height: 115%;
						font-family: 'Arial', sans-serif;
						color: black;
						mso-ansi-language: EN-US;
					"
					><o:p></o:p
				></span>
			</p>

			<p
				style="
					margin-top: 1pt;
					margin-right: 0cm;
					margin-bottom: 1pt;
					margin-left: 0cm;
					line-height: 115%;
				"
			>
				<span class="SpellE"
					><strong
						><span
							lang="EN-US"
							style="
								font-size: 13pt;
								line-height: 115%;
								color: black;
								background: white;
								mso-ansi-language: EN-US;
							"
							>Điện</span
						></strong
					></span
				><strong
					><span
						lang="EN-US"
						style="
							font-size: 13pt;
							line-height: 115%;
							color: black;
							background: white;
							mso-ansi-language: EN-US;
						"
					>
						<span class="SpellE">thoại</span>:</span
					></strong
				><span
					lang="EN-US"
					style="
						font-size: 13pt;
						line-height: 115%;
						color: black;
						background: white;
						mso-ansi-language: EN-US;
					"
				>
					0353370505</span
				><span lang="EN-US"> </span
				><span
					lang="EN-US"
					style="
						font-size: 11pt;
						line-height: 115%;
						font-family: 'Arial', sans-serif;
						color: black;
						mso-ansi-language: EN-US;
					"
					><o:p></o:p
				></span>
			</p>

			<p
				style="
					margin-top: 1pt;
					margin-right: 0cm;
					margin-bottom: 1pt;
					margin-left: 0cm;
					line-height: 115%;
				"
			>
				<span
					lang="EN-US"
					style="
						font-size: 13pt;
						line-height: 115%;
						color: black;
						background: white;
						mso-ansi-language: EN-US;
					"
					>&nbsp;</span
				><span lang="EN-US"> </span
				><span
					lang="EN-US"
					style="
						font-size: 11pt;
						line-height: 115%;
						font-family: 'Arial', sans-serif;
						color: black;
						mso-ansi-language: EN-US;
					"
					><o:p></o:p
				></span>
			</p>

			<p
				style="
					margin-top: 1pt;
					margin-right: 0cm;
					margin-bottom: 1pt;
					margin-left: 0cm;
					line-height: 115%;
				"
			>
				<strong
					><u
						><span
							lang="EN-US"
							style="
								font-size: 13pt;
								line-height: 115%;
								color: #333333;
								background: white;
								mso-ansi-language: EN-US;
							"
							>BÊN <span class="GramE">B :</span> BÊN THUÊ</span
						></u
					></strong
				><span lang="EN-US"> </span
				><span
					lang="EN-US"
					style="
						font-size: 11pt;
						line-height: 115%;
						font-family: 'Arial', sans-serif;
						color: black;
						mso-ansi-language: EN-US;
					"
					><o:p></o:p
				></span>
			</p>

			<p
				style="
					margin-top: 1pt;
					margin-right: 0cm;
					margin-bottom: 1pt;
					margin-left: 0cm;
					line-height: 115%;
				"
			>
				<span class="SpellE"
					><strong
						><span
							lang="EN-US"
							style="
								font-size: 13pt;
								line-height: 115%;
								color: black;
								background: white;
								mso-ansi-language: EN-US;
							"
							>Ông</span
						></strong
					></span
				><strong
					><span
						lang="EN-US"
						style="
							font-size: 13pt;
							line-height: 115%;
							color: black;
							background: white;
							mso-ansi-language: EN-US;
						"
						>/<span class="SpellE">bà</span>:</span
					></strong
				><span
					lang="EN-US"
					style="
						font-size: 13pt;
						line-height: 115%;
						color: black;
						background: white;
						mso-ansi-language: EN-US;
					"
				>
					${roomRentalDetail?.customerName}</span
				><span class="MsoCommentReference"
					><span
						lang="EN-US"
						style="font-size: 8pt; line-height: 115%; mso-ansi-language: EN-US"
						>&nbsp;</span
					></span
				><span class="SpellE"
					><strong
						><span
							lang="EN-US"
							style="
								font-size: 13pt;
								line-height: 115%;
								color: black;
								background: white;
								mso-ansi-language: EN-US;
							"
							>Năm</span
						></strong
					></span
				><strong
					><span
						lang="EN-US"
						style="
							font-size: 13pt;
							line-height: 115%;
							color: black;
							background: white;
							mso-ansi-language: EN-US;
						"
					>
						<span class="SpellE">sinh</span>:</span
					></strong
				><span
					lang="EN-US"
					style="
						font-size: 13pt;
						line-height: 115%;
						color: black;
						background: white;
						mso-ansi-language: EN-US;
					"
				>
					${roomRentalDetail?.dateOfBirth}</span
				><span lang="EN-US"> </span
				><span
					lang="EN-US"
					style="
						font-size: 11pt;
						line-height: 115%;
						font-family: 'Arial', sans-serif;
						color: black;
						mso-ansi-language: EN-US;
					"
					><o:p></o:p
				></span>
			</p>

			<p
				style="
					margin-top: 1pt;
					margin-right: 0cm;
					margin-bottom: 1pt;
					margin-left: 0cm;
					line-height: 115%;
				"
			>
				<strong
					><span
						lang="EN-US"
						style="
							font-size: 13pt;
							line-height: 115%;
							color: black;
							background: white;
							mso-ansi-language: EN-US;
						"
						>CMND <span class="SpellE">số</span>:</span
					></strong
				><span
					lang="EN-US"
					style="
						font-size: 13pt;
						line-height: 115%;
						color: black;
						background: white;
						mso-ansi-language: EN-US;
					"
				>
					${roomRentalDetail?.citizenIdentification}</span
				><span
					lang="EN-US"
					style="
						font-size: 11pt;
						line-height: 115%;
						font-family: 'Arial', sans-serif;
						color: black;
						mso-ansi-language: EN-US;
					"
				>
				</span
				><span class="SpellE"
					><strong
						><span
							lang="EN-US"
							style="
								font-size: 13pt;
								line-height: 115%;
								color: black;
								background: white;
								mso-ansi-language: EN-US;
							"
							>Ngày</span
						></strong
					></span
				><strong
					><span
						lang="EN-US"
						style="
							font-size: 13pt;
							line-height: 115%;
							color: black;
							background: white;
							mso-ansi-language: EN-US;
						"
					>
						<span class="SpellE">cấp</span>:</span
					></strong
				><span
					lang="EN-US"
					style="
						font-size: 13pt;
						line-height: 115%;
						color: black;
						background: white;
						mso-ansi-language: EN-US;
					"
				>
					${roomRentalDetail?.dateRange} <span class="SpellE"><strong>Nơi</strong></span
					><strong> <span class="SpellE">cấp</span>:</strong>
					<span class="SpellE">Hồ</span>
					<span class="SpellE">Chí</span> Minh</span
				><span lang="EN-US"> </span
				><span
					lang="EN-US"
					style="
						font-size: 11pt;
						line-height: 115%;
						font-family: 'Arial', sans-serif;
						color: black;
						mso-ansi-language: EN-US;
					"
					><o:p></o:p
				></span>
			</p>

			<p
				style="
					margin-top: 1pt;
					margin-right: 0cm;
					margin-bottom: 1pt;
					margin-left: 0cm;
					line-height: 115%;
				"
			>
				<span class="SpellE"
					><strong
						><span
							lang="EN-US"
							style="
								font-size: 13pt;
								line-height: 115%;
								color: black;
								background: white;
								mso-ansi-language: EN-US;
							"
							>Địa</span
						></strong
					></span
				><strong
					><span
						lang="EN-US"
						style="
							font-size: 13pt;
							line-height: 115%;
							color: black;
							background: white;
							mso-ansi-language: EN-US;
						"
					>
						<span class="SpellE">chỉ</span> <span class="SpellE">thường</span>
						<span class="SpellE">trú</span>: </span
					></strong
				><span
					lang="EN-US"
					style="
						font-size: 13pt;
						line-height: 115%;
						color: black;
						background: white;
						mso-ansi-language: EN-US;
					"
				>
					${roomRentalDetail?.address}</span
				><span lang="EN-US"> </span
				><span
					lang="EN-US"
					style="
						font-size: 11pt;
						line-height: 115%;
						font-family: 'Arial', sans-serif;
						color: black;
						mso-ansi-language: EN-US;
					"
					><o:p></o:p
				></span>
			</p>

			<p
				style="
					margin-top: 1pt;
					margin-right: 0cm;
					margin-bottom: 1pt;
					margin-left: 0cm;
					line-height: 115%;
				"
			>
				<span class="SpellE"
					><strong
						><span
							lang="EN-US"
							style="
								font-size: 13pt;
								line-height: 115%;
								color: black;
								mso-ansi-language: EN-US;
							"
							>Điện</span
						></strong
					></span
				><strong
					><span
						lang="EN-US"
						style="
							font-size: 13pt;
							line-height: 115%;
							color: black;
							mso-ansi-language: EN-US;
						"
					>
						<span class="SpellE">thoại</span>:</span
					></strong
				><span
					lang="EN-US"
					style="
						font-size: 13pt;
						line-height: 115%;
						color: black;
						mso-ansi-language: EN-US;
					"
				>
					${roomRentalDetail?.phone}</span
				><span lang="EN-US"> </span
				><span
					lang="EN-US"
					style="
						font-size: 11pt;
						line-height: 115%;
						font-family: 'Arial', sans-serif;
						color: black;
						mso-ansi-language: EN-US;
					"
					><o:p></o:p
				></span>
			</p>

			<p
				style="
					margin-top: 1pt;
					margin-right: 0cm;
					margin-bottom: 1pt;
					margin-left: 0cm;
					line-height: 115%;
				"
			>
				<span
					lang="EN-US"
					style="
						font-size: 13pt;
						line-height: 115%;
						color: black;
						mso-ansi-language: EN-US;
					"
					>Hai <span class="SpellE">bên</span> <span class="SpellE">cùng</span>
					<span class="SpellE">thỏa</span> <span class="SpellE">thuận</span>
					<span class="SpellE">ký</span> <span class="SpellE">hợp</span>
					<span class="SpellE">đồng</span> <span class="SpellE">với</span>
					<span class="SpellE">những</span> <span class="SpellE">nội</span> dung
					<span class="SpellE">sau</span>:</span
				><span lang="EN-US"> </span
				><span
					lang="EN-US"
					style="
						font-size: 11pt;
						line-height: 115%;
						font-family: 'Arial', sans-serif;
						color: black;
						mso-ansi-language: EN-US;
					"
					><o:p></o:p
				></span>
			</p>

			<p
				style="
					margin-top: 6pt;
					margin-right: 0cm;
					margin-bottom: 6pt;
					margin-left: 0cm;
					text-indent: 18pt;
					line-height: 115%;
				"
			>
				<span class="SpellE"
					><strong
						><span lang="EN-US" style="mso-ansi-language: EN-US"
							>Điều</span
						></strong
					></span
				><strong
					><span lang="EN-US" style="mso-ansi-language: EN-US">
						1:
					</span></strong
				><span lang="EN-US" style="mso-ansi-language: EN-US"><o:p></o:p></span>
			</p>

			<p
				class="MsoNormal"
				style="
					margin-top: 6pt;
					margin-right: 0cm;
					margin-bottom: 6pt;
					margin-left: 54pt;
					text-indent: -18pt;
					line-height: 115%;
					mso-list: l0 level1 lfo2;
					tab-stops: list 36pt;
				"
			>
				<![if !supportLists]><span
					lang="EN-US"
					style="
						font-size: 10pt;
						mso-bidi-font-size: 12pt;
						line-height: 115%;
						font-family: Symbol;
						mso-fareast-font-family: Symbol;
						mso-bidi-font-family: Symbol;
						mso-ansi-language: EN-US;
					"
					><span style="mso-list: Ignore"
						>·<span style="font: 7pt 'Times New Roman'"
							>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						</span></span
					></span
				><![endif]><span class="SpellE"
					><span
						lang="EN-US"
						style="
							mso-fareast-font-family: 'Times New Roman';
							mso-ansi-language: EN-US;
						"
						>Bên</span
					></span
				><span
					lang="EN-US"
					style="
						mso-fareast-font-family: 'Times New Roman';
						mso-ansi-language: EN-US;
					"
				>
					A <span class="SpellE">đồng</span> ý <span class="SpellE">cho</span>
					<span class="SpellE">bên</span> B <span class="SpellE">thuê</span>
					<span class="SpellE">phòng</span> <span class="SpellE">trọ</span>
					<span class="SpellE">số</span> ${roomRentalDetail.roomName}</span
				><span class="MsoCommentReference"
					><span
						lang="EN-US"
						style="
							font-size: 8pt;
							line-height: 115%;
							mso-fareast-font-family: 'Times New Roman';
							mso-ansi-language: EN-US;
						"
						>&nbsp;</span
					></span
				><span class="SpellE"
					><span
						lang="EN-US"
						style="
							mso-fareast-font-family: 'Times New Roman';
							mso-ansi-language: EN-US;
						"
						>thuộc</span
					></span
				><span
					lang="EN-US"
					style="
						mso-fareast-font-family: 'Times New Roman';
						mso-ansi-language: EN-US;
					"
				>
					<span class="SpellE">địa</span> <span class="SpellE">chỉ</span>: ${motel.name}
					<span class="SpellE"> ${motel.address} ${motel.district} ${motel.province}</span
				><span lang="EN-US"> </span
				><span
					lang="EN-US"
					style="
						mso-fareast-font-family: 'Times New Roman';
						mso-ansi-language: EN-US;
					"
					><o:p></o:p
				></span>
			</p>

			<p
				class="MsoNormal"
				style="
					margin-top: 6pt;
					margin-right: 0cm;
					margin-bottom: 6pt;
					margin-left: 54pt;
					text-indent: -18pt;
					line-height: 115%;
					mso-list: l0 level1 lfo2;
					tab-stops: list 36pt;
				"
			>
				<![if !supportLists]><span
					lang="EN-US"
					style="
						font-size: 10pt;
						mso-bidi-font-size: 12pt;
						line-height: 115%;
						font-family: Symbol;
						mso-fareast-font-family: Symbol;
						mso-bidi-font-family: Symbol;
						mso-ansi-language: EN-US;
					"
					><span style="mso-list: Ignore"
						>·<span style="font: 7pt 'Times New Roman'"
							>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						</span></span
					></span
				><![endif]><span class="SpellE"
					><span
						lang="EN-US"
						style="
							mso-fareast-font-family: 'Times New Roman';
							mso-ansi-language: EN-US;
						"
						>Thời</span
					></span
				><span
					lang="EN-US"
					style="
						mso-fareast-font-family: 'Times New Roman';
						mso-ansi-language: EN-US;
					"
				>
					<span class="SpellE">hạn</span> <span class="SpellE">thuê</span>
					<span class="SpellE">phòng</span> <span class="SpellE">trọ</span>
					<span class="SpellE"> kể</span> <span class="SpellE">từ</span>
					<span class="SpellE">ngày </span>
                    ${moment(roomRentalDetail.startDate, 'DD-MM-YYYY')}</span
				><span lang="EN-US"> </span
				><span
					lang="EN-US"
					style="
						mso-fareast-font-family: 'Times New Roman';
						mso-ansi-language: EN-US;
					"
					><o:p></o:p
				></span>
			</p>

			<p
				style="
					margin-top: 6pt;
					margin-right: 0cm;
					margin-bottom: 6pt;
					margin-left: 18pt;
					line-height: 115%;
				"
			>
				<span class="SpellE"
					><strong
						><span lang="EN-US" style="mso-ansi-language: EN-US"
							>Điều</span
						></strong
					></span
				><strong
					><span lang="EN-US" style="mso-ansi-language: EN-US">
						<span class="GramE">2 :</span></span
					></strong
				><span lang="EN-US"> </span
				><span lang="EN-US" style="mso-ansi-language: EN-US"><o:p></o:p></span>
			</p>

			<p
				class="MsoNormal"
				style="
					margin-top: 6pt;
					margin-right: 0cm;
					margin-bottom: 6pt;
					margin-left: 54pt;
					text-indent: -18pt;
					line-height: 115%;
					mso-list: l2 level1 lfo4;
					tab-stops: list 36pt;
				"
			>
				<![if !supportLists]><span
					lang="EN-US"
					style="
						font-size: 10pt;
						mso-bidi-font-size: 12pt;
						line-height: 115%;
						font-family: Symbol;
						mso-fareast-font-family: Symbol;
						mso-bidi-font-family: Symbol;
						mso-ansi-language: EN-US;
					"
					><span style="mso-list: Ignore"
						>·<span style="font: 7pt 'Times New Roman'"
							>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						</span></span
					></span
				><![endif]><span class="SpellE"
					><span
						lang="EN-US"
						style="
							mso-fareast-font-family: 'Times New Roman';
							mso-ansi-language: EN-US;
						"
						>Giá</span
					></span
				><span
					lang="EN-US"
					style="
						mso-fareast-font-family: 'Times New Roman';
						mso-ansi-language: EN-US;
					"
				>
					<span class="SpellE">tiền</span> <span class="SpellE">thuê</span>
					<span class="SpellE">phòng</span> <span class="SpellE">trọ</span>
					<span class="SpellE">là </span> 
                    ${generatePriceToVND(+roomRentalDetail.priceRoom)}</span
				><span class="MsoCommentReference"
					><span
						lang="EN-US"
						style="
							font-size: 8pt;
							line-height: 115%;
							mso-fareast-font-family: 'Times New Roman';
							mso-ansi-language: EN-US;
						"
						>&nbsp;</span
					></span
				><span class="SpellE"
					><span
						lang="EN-US"
						style="
							mso-fareast-font-family: 'Times New Roman';
							mso-ansi-language: EN-US;
						"
						>đồng</span
					></span
				><span
					lang="EN-US"
					style="
						mso-fareast-font-family: 'Times New Roman';
						mso-ansi-language: EN-US;
					"
					>/<span class="SpellE">tháng</span></span
				><span lang="EN-US"> </span
				><span
					lang="EN-US"
					style="
						mso-fareast-font-family: 'Times New Roman';
						mso-ansi-language: EN-US;
					"
					><o:p></o:p
				></span>
			</p> 

			<p
				class="MsoNormal"
				style="
					margin-top: 6pt;
					margin-right: 0cm;
					margin-bottom: 6pt;
					margin-left: 54pt;
					text-indent: -18pt;
					line-height: 115%;
					mso-list: l3 level1 lfo6;
					tab-stops: list 36pt;
				"
			>
				<![if !supportLists]><span
					lang="EN-US"
					style="
						font-size: 10pt;
						mso-bidi-font-size: 12pt;
						line-height: 115%;
						font-family: Symbol;
						mso-fareast-font-family: Symbol;
						mso-bidi-font-family: Symbol;
						mso-ansi-language: EN-US;
					"
					><span style="mso-list: Ignore"
						>·<span style="font: 7pt 'Times New Roman'"
							>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						</span></span
					></span
				><![endif]><span class="SpellE"
					><span
						lang="EN-US"
						style="
							mso-fareast-font-family: 'Times New Roman';
							mso-ansi-language: EN-US;
						"
						>Tiền</span
					></span
				><span
					lang="EN-US"
					style="
						mso-fareast-font-family: 'Times New Roman';
						mso-ansi-language: EN-US;
					"
				>
					<span class="SpellE">thuê</span> <span class="SpellE">nhà</span>
					<span class="SpellE">bên</span> B <span class="SpellE">thanh</span>
					<span class="SpellE">toán</span> <span class="SpellE">cho</span>
					<span class="SpellE">bên</span> A <span class="SpellE">từ</span>
					<span class="SpellE">ngày</span> 1-5 <span class="SpellE">Tây</span>
					<span class="SpellE">hàng</span>
					<span class="SpellE">tháng</span>.</span
				><span lang="EN-US"> </span
				><span
					lang="EN-US"
					style="
						mso-fareast-font-family: 'Times New Roman';
						mso-ansi-language: EN-US;
					"
					><o:p></o:p
				></span>
			</p>

			<p
				class="MsoNormal"
				style="
					margin-top: 6pt;
					margin-right: 0cm;
					margin-bottom: 6pt;
					margin-left: 54pt;
					text-indent: -18pt;
					line-height: 115%;
					mso-list: l3 level1 lfo6;
					tab-stops: list 36pt;
				"
			>
				<![if !supportLists]><span
					lang="EN-US"
					style="
						font-size: 10pt;
						mso-bidi-font-size: 12pt;
						line-height: 115%;
						font-family: Symbol;
						mso-fareast-font-family: Symbol;
						mso-bidi-font-family: Symbol;
						mso-ansi-language: EN-US;
					"
					><span style="mso-list: Ignore"
						>·<span style="font: 7pt 'Times New Roman'"
							>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						</span></span
					></span
				><![endif]><span class="SpellE"
					><span
						lang="EN-US"
						style="
							mso-fareast-font-family: 'Times New Roman';
							mso-ansi-language: EN-US;
						"
						>Bên</span
					></span
				><span
					lang="EN-US"
					style="
						mso-fareast-font-family: 'Times New Roman';
						mso-ansi-language: EN-US;
					"
				>
					B <span class="SpellE">đặt</span> <span class="SpellE">tiền</span>
					<span class="SpellE">thế</span> <span class="SpellE">chân</span>
					<span class="SpellE">trước </span> 
                    ${generatePriceToVND(+roomRentalDetail.deposit)}</span
				><span class="MsoCommentReference"
					><span
						lang="EN-US"
						style="
							font-size: 8pt;
							line-height: 115%;
							mso-fareast-font-family: 'Times New Roman';
							mso-ansi-language: EN-US;
						"
						>&nbsp;</span
					></span
				><span class="SpellE"
					><span
						lang="EN-US"
						style="
							mso-fareast-font-family: 'Times New Roman';
							mso-ansi-language: EN-US;
						"
						>đồng</span
					></span
				><span
					lang="EN-US"
					style="
						mso-fareast-font-family: 'Times New Roman';
						mso-ansi-language: EN-US;
					"
					>&nbsp;</span
				><span lang="EN-US"> </span
				><span
					lang="EN-US"
					style="
						mso-fareast-font-family: 'Times New Roman';
						mso-ansi-language: EN-US;
					"
					><o:p></o:p
				></span>
			</p>

			<p
				style="
					margin-top: 6pt;
					margin-right: 0cm;
					margin-bottom: 6pt;
					margin-left: 54pt;
					line-height: 115%;
				"
			>
				 <span class="MsoCommentReference"
					><span
						lang="EN-US"
						style="font-size: 8pt; line-height: 115%; mso-ansi-language: EN-US"
						>&nbsp;</span
					></span
				><span class="SpellE"
					><span lang="EN-US" style="mso-ansi-language: EN-US">cho</span></span
				><span lang="EN-US" style="mso-ansi-language: EN-US">
					<span class="SpellE">bên</span> A.</span
				><span lang="EN-US"> </span
				><span lang="EN-US" style="mso-ansi-language: EN-US"><o:p></o:p></span>
			</p>

			<p
				style="
					margin-top: 6pt;
					margin-right: 0cm;
					margin-bottom: 6pt;
					margin-left: 54pt;
					line-height: 115%;
				"
			>
				<span class="SpellE"
					><span lang="EN-US" style="mso-ansi-language: EN-US">Tiền</span></span
				><span lang="EN-US" style="mso-ansi-language: EN-US">
					<span class="SpellE">thế</span> <span class="SpellE">chân</span>
					<span class="SpellE">sẽ</span> <span class="SpellE">được</span>
					<span class="SpellE">trả</span> <span class="SpellE">lại</span>
					<span class="SpellE">đầy</span> <span class="SpellE">đủ</span>
					<span class="SpellE">cho</span> <span class="SpellE">bên</span>
					<span class="SpellE">thuê</span> (<span class="SpellE">Bên</span> B)
					<span class="SpellE">khi</span> <span class="SpellE">hết</span>
					<span class="SpellE">hợp</span> <span class="SpellE">đồng</span>
					<span class="SpellE">thuê</span> <span class="SpellE">phòng</span>
					<span class="SpellE">trọ</span> <span class="SpellE">nêu</span>
					<span class="SpellE">trên</span> <span class="SpellE">và</span>
					<span class="SpellE">thanh</span> <span class="SpellE">toán</span>
					<span class="SpellE">đầy</span> <span class="SpellE">đủ</span>
					<span class="SpellE">tiền</span> <span class="SpellE">điện</span>,
					<span class="SpellE">nước</span>, <span class="SpellE">phí</span>
					<span class="SpellE">dịch</span> <span class="SpellE">vụ</span>
					<span class="SpellE">và</span> <span class="SpellE">các</span>
					<span class="SpellE">khoản</span> <span class="SpellE">khác</span>
					<span class="SpellE">liên</span>
					<span class="SpellE">quan</span>.</span
				><span lang="EN-US"> </span
				><span lang="EN-US" style="mso-ansi-language: EN-US"><o:p></o:p></span>
			</p>

			<p
				class="MsoNormal"
				style="
					margin-top: 6pt;
					margin-right: 0cm;
					margin-bottom: 6pt;
					margin-left: 54pt;
					text-indent: -18pt;
					line-height: 115%;
					mso-list: l4 level1 lfo8;
					tab-stops: list 36pt;
				"
			>
				<![if !supportLists]><span
					lang="EN-US"
					style="
						font-size: 10pt;
						mso-bidi-font-size: 12pt;
						line-height: 115%;
						font-family: Symbol;
						mso-fareast-font-family: Symbol;
						mso-bidi-font-family: Symbol;
						mso-ansi-language: EN-US;
					"
					><span style="mso-list: Ignore"
						>·<span style="font: 7pt 'Times New Roman'"
							>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						</span></span
					></span
				><![endif]><span class="SpellE"
					><span
						lang="EN-US"
						style="
							mso-fareast-font-family: 'Times New Roman';
							mso-ansi-language: EN-US;
						"
						>Bên</span
					></span
				><span
					lang="EN-US"
					style="
						mso-fareast-font-family: 'Times New Roman';
						mso-ansi-language: EN-US;
					"
				>
					B <span class="SpellE">ngưng</span> <span class="SpellE">hợp</span>
					<span class="SpellE">đồng</span> <span class="SpellE">trước</span>
					<span class="SpellE">thời</span> <span class="SpellE">hạn</span>
					<span class="SpellE">thì</span> <span class="SpellE">phải</span>
					<span class="SpellE">chịu</span> <span class="SpellE">mất</span>
					<span class="SpellE">tiền</span> <span class="SpellE">thế</span>
					<span class="SpellE">chân</span>.</span
				><span lang="EN-US"> </span
				><span
					lang="EN-US"
					style="
						mso-fareast-font-family: 'Times New Roman';
						mso-ansi-language: EN-US;
					"
					><o:p></o:p
				></span>
			</p>

			<p
				class="MsoNormal"
				style="
					margin-top: 6pt;
					margin-right: 0cm;
					margin-bottom: 6pt;
					margin-left: 54pt;
					text-indent: -18pt;
					line-height: 115%;
					mso-list: l4 level1 lfo8;
					tab-stops: list 36pt;
				"
			>
				<![if !supportLists]><span
					lang="EN-US"
					style="
						font-size: 10pt;
						mso-bidi-font-size: 12pt;
						line-height: 115%;
						font-family: Symbol;
						mso-fareast-font-family: Symbol;
						mso-bidi-font-family: Symbol;
						mso-ansi-language: EN-US;
					"
					><span style="mso-list: Ignore"
						>·<span style="font: 7pt 'Times New Roman'"
							>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						</span></span
					></span
				><![endif]><span class="SpellE"
					><span
						lang="EN-US"
						style="
							mso-fareast-font-family: 'Times New Roman';
							mso-ansi-language: EN-US;
						"
						>Bên</span
					></span
				><span
					lang="EN-US"
					style="
						mso-fareast-font-family: 'Times New Roman';
						mso-ansi-language: EN-US;
					"
				>
					A <span class="SpellE">ngưng</span> <span class="SpellE">hợp</span>
					<span class="SpellE">đồng</span> (<span class="SpellE">lấy</span>
					<span class="SpellE">lại</span> <span class="SpellE">nhà</span>)
					<span class="SpellE">trước</span> <span class="SpellE">thời</span>
					<span class="SpellE">hạn</span> <span class="SpellE">thì</span>
					<span class="SpellE">bồi</span> <span class="SpellE">thường</span>
					<span class="SpellE">gấp</span> <span class="SpellE">đôi</span>
					<span class="SpellE">số</span> <span class="SpellE">tiền</span>
					<span class="SpellE">bên</span> B <span class="SpellE">đã</span>
					<span class="SpellE">thế</span>
					<span class="SpellE">chân</span>.</span
				><span lang="EN-US"> </span
				><span
					lang="EN-US"
					style="
						mso-fareast-font-family: 'Times New Roman';
						mso-ansi-language: EN-US;
					"
					><o:p></o:p
				></span>
			</p>

			<p
				style="
					margin-top: 6pt;
					margin-right: 0cm;
					margin-bottom: 6pt;
					margin-left: 18pt;
					line-height: 115%;
				"
			>
				<span class="SpellE"
					><strong
						><span lang="EN-US" style="mso-ansi-language: EN-US"
							>Điều</span
						></strong
					></span
				><strong
					><span lang="EN-US" style="mso-ansi-language: EN-US">
						<span class="GramE">3 :</span></span
					></strong
				><span lang="EN-US" style="mso-ansi-language: EN-US">
					<span class="SpellE">Trách</span> <span class="SpellE">nhiệm</span>
					<span class="SpellE">bên</span> A.</span
				><span lang="EN-US"> </span
				><span lang="EN-US" style="mso-ansi-language: EN-US"><o:p></o:p></span>
			</p>

			<p
				class="MsoNormal"
				style="
					margin-top: 6pt;
					margin-right: 0cm;
					margin-bottom: 6pt;
					margin-left: 54pt;
					text-indent: -18pt;
					line-height: 115%;
					mso-list: l1 level1 lfo10;
					tab-stops: list 36pt;
				"
			>
				<![if !supportLists]><span
					lang="EN-US"
					style="
						font-size: 10pt;
						mso-bidi-font-size: 12pt;
						line-height: 115%;
						font-family: Symbol;
						mso-fareast-font-family: Symbol;
						mso-bidi-font-family: Symbol;
						mso-ansi-language: EN-US;
					"
					><span style="mso-list: Ignore"
						>·<span style="font: 7pt 'Times New Roman'"
							>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						</span></span
					></span
				><![endif]><span
					lang="EN-US"
					style="
						mso-fareast-font-family: 'Times New Roman';
						mso-ansi-language: EN-US;
					"
					>Giao <span class="SpellE">phòng</span>
					<span class="SpellE">trọ</span>, <span class="SpellE">trang</span>
					<span class="SpellE">thiết</span> <span class="SpellE">bị</span>
					<span class="SpellE">trong</span> <span class="SpellE">phòng</span>
					<span class="SpellE">trọ</span> <span class="SpellE">cho</span>
					<span class="SpellE">bên</span> B <span class="SpellE">đúng</span>
					<span class="SpellE">ngày</span> <span class="SpellE">ký</span>
					<span class="SpellE">hợp</span>
					<span class="SpellE">đồng</span>.</span
				><span lang="EN-US"> </span
				><span
					lang="EN-US"
					style="
						mso-fareast-font-family: 'Times New Roman';
						mso-ansi-language: EN-US;
					"
					><o:p></o:p
				></span>
			</p>

			<p
				class="MsoNormal"
				style="
					margin-top: 6pt;
					margin-right: 0cm;
					margin-bottom: 6pt;
					margin-left: 54pt;
					text-indent: -18pt;
					line-height: 115%;
					mso-list: l1 level1 lfo10;
					tab-stops: list 36pt;
				"
			>
				<![if !supportLists]><span
					lang="EN-US"
					style="
						font-size: 10pt;
						mso-bidi-font-size: 12pt;
						line-height: 115%;
						font-family: Symbol;
						mso-fareast-font-family: Symbol;
						mso-bidi-font-family: Symbol;
						mso-ansi-language: EN-US;
					"
					><span style="mso-list: Ignore"
						>·<span style="font: 7pt 'Times New Roman'"
							>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						</span></span
					></span
				><![endif]><span class="SpellE"
					><span
						lang="EN-US"
						style="
							mso-fareast-font-family: 'Times New Roman';
							mso-ansi-language: EN-US;
						"
						>Hướng</span
					></span
				><span
					lang="EN-US"
					style="
						mso-fareast-font-family: 'Times New Roman';
						mso-ansi-language: EN-US;
					"
				>
					<span class="SpellE">dẫn</span> <span class="SpellE">bên</span> B
					<span class="SpellE">chấp</span> <span class="SpellE">hành</span>
					<span class="SpellE">đúng</span> <span class="SpellE">các</span>
					<span class="SpellE">quy</span> <span class="SpellE">định</span>
					<span class="SpellE">của</span> <span class="SpellE">địa</span>
					<span class="SpellE">phương</span>, <span class="SpellE">hoàn</span>
					<span class="SpellE">tất</span> <span class="SpellE">mọi</span>
					<span class="SpellE">thủ</span> <span class="SpellE">tục</span>
					<span class="SpellE">giấy</span> <span class="SpellE">tờ</span>
					<span class="SpellE">đăng</span> <span class="SpellE">ký</span>
					<span class="SpellE">tạm</span> <span class="SpellE">trú</span>
					<span class="SpellE">cho</span>
					<span class="SpellE">bên</span> B.</span
				><span lang="EN-US"> </span
				><span
					lang="EN-US"
					style="
						mso-fareast-font-family: 'Times New Roman';
						mso-ansi-language: EN-US;
					"
					><o:p></o:p
				></span>
			</p>

			<p
				style="
					margin-top: 6pt;
					margin-right: 0cm;
					margin-bottom: 6pt;
					margin-left: 18pt;
					line-height: 115%;
				"
			>
				<span lang="EN-US" style="mso-ansi-language: EN-US">&nbsp;</span
				><span lang="EN-US"> </span
				><span lang="EN-US" style="mso-ansi-language: EN-US"><o:p></o:p></span>
			</p>

			<p
				style="
					margin-top: 6pt;
					margin-right: 0cm;
					margin-bottom: 6pt;
					margin-left: 18pt;
					line-height: 115%;
				"
			>
				<span class="SpellE"
					><strong
						><span lang="EN-US" style="mso-ansi-language: EN-US"
							>Điều</span
						></strong
					></span
				><strong
					><span lang="EN-US" style="mso-ansi-language: EN-US">
						<span class="GramE">4 :</span></span
					></strong
				><span lang="EN-US" style="mso-ansi-language: EN-US">
					<span class="SpellE">Trách</span> <span class="SpellE">nhiệm</span>
					<span class="SpellE">bên</span> B.</span
				><span lang="EN-US"> </span
				><span lang="EN-US" style="mso-ansi-language: EN-US"><o:p></o:p></span>
			</p>

			<p
				class="MsoNormal"
				style="
					margin-top: 6pt;
					margin-right: 0cm;
					margin-bottom: 6pt;
					margin-left: 54pt;
					text-indent: -18pt;
					line-height: 115%;
					mso-list: l5 level1 lfo12;
					tab-stops: list 36pt;
				"
			>
				<![if !supportLists]><span
					lang="EN-US"
					style="
						font-size: 10pt;
						mso-bidi-font-size: 12pt;
						line-height: 115%;
						font-family: Symbol;
						mso-fareast-font-family: Symbol;
						mso-bidi-font-family: Symbol;
						mso-ansi-language: EN-US;
					"
					><span style="mso-list: Ignore"
						>·<span style="font: 7pt 'Times New Roman'"
							>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						</span></span
					></span
				><![endif]><span class="SpellE"
					><span
						lang="EN-US"
						style="
							mso-fareast-font-family: 'Times New Roman';
							mso-ansi-language: EN-US;
						"
						>Trả</span
					></span
				><span
					lang="EN-US"
					style="
						mso-fareast-font-family: 'Times New Roman';
						mso-ansi-language: EN-US;
					"
				>
					<span class="SpellE">tiền</span> <span class="SpellE">thuê</span>
					<span class="SpellE">phòng</span> <span class="SpellE">trọ</span>
					<span class="SpellE">hàng</span> <span class="SpellE">tháng</span>
					<span class="SpellE">theo</span> <span class="SpellE">hợp</span>
					<span class="SpellE">đồng</span>.</span
				><span lang="EN-US"> </span
				><span
					lang="EN-US"
					style="
						mso-fareast-font-family: 'Times New Roman';
						mso-ansi-language: EN-US;
					"
					><o:p></o:p
				></span>
			</p>

			<p
				class="MsoNormal"
				style="
					margin-top: 6pt;
					margin-right: 0cm;
					margin-bottom: 6pt;
					margin-left: 54pt;
					text-indent: -18pt;
					line-height: 115%;
					mso-list: l5 level1 lfo12;
					tab-stops: list 36pt;
				"
			>
				<![if !supportLists]><span
					lang="EN-US"
					style="
						font-size: 10pt;
						mso-bidi-font-size: 12pt;
						line-height: 115%;
						font-family: Symbol;
						mso-fareast-font-family: Symbol;
						mso-bidi-font-family: Symbol;
						mso-ansi-language: EN-US;
					"
					><span style="mso-list: Ignore"
						>·<span style="font: 7pt 'Times New Roman'"
							>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						</span></span
					></span
				><![endif]><span class="SpellE"
					><span
						lang="EN-US"
						style="
							mso-fareast-font-family: 'Times New Roman';
							mso-ansi-language: EN-US;
						"
						>Sử</span
					></span
				><span
					lang="EN-US"
					style="
						mso-fareast-font-family: 'Times New Roman';
						mso-ansi-language: EN-US;
					"
				>
					<span class="SpellE">dụng</span> <span class="SpellE">đúng</span>
					<span class="SpellE">mục</span> <span class="SpellE">đích</span>
					<span class="SpellE">thuê</span> <span class="SpellE">phòng</span>
					<span class="SpellE">trọ</span>, <span class="SpellE">khi</span>
					<span class="SpellE">cần</span> <span class="SpellE">sữa</span>
					<span class="SpellE">chữa</span>, <span class="SpellE">cải</span>
					<span class="SpellE">tạo</span> <span class="SpellE">theo</span>
					<span class="SpellE">yêu</span> <span class="SpellE">cầu</span>
					<span class="SpellE">sử</span> <span class="SpellE">dụng</span>
					<span class="SpellE">riêng</span> <span class="SpellE">phải</span>
					<span class="SpellE">được</span> <span class="SpellE">sự</span>
					<span class="SpellE">đồng</span> ý <span class="SpellE">của</span>
					<span class="SpellE">bên</span> A.</span
				><span lang="EN-US"> </span
				><span
					lang="EN-US"
					style="
						mso-fareast-font-family: 'Times New Roman';
						mso-ansi-language: EN-US;
					"
					><o:p></o:p
				></span>
			</p>

			<p
				class="MsoNormal"
				style="
					margin-top: 6pt;
					margin-right: 0cm;
					margin-bottom: 6pt;
					margin-left: 54pt;
					text-indent: -18pt;
					line-height: 115%;
					mso-list: l5 level1 lfo12;
					tab-stops: list 36pt;
				"
			>
				<![if !supportLists]><span
					lang="EN-US"
					style="
						font-size: 10pt;
						mso-bidi-font-size: 12pt;
						line-height: 115%;
						font-family: Symbol;
						mso-fareast-font-family: Symbol;
						mso-bidi-font-family: Symbol;
						mso-ansi-language: EN-US;
					"
					><span style="mso-list: Ignore"
						>·<span style="font: 7pt 'Times New Roman'"
							>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						</span></span
					></span
				><![endif]><span class="SpellE"
					><span
						lang="EN-US"
						style="
							mso-fareast-font-family: 'Times New Roman';
							mso-ansi-language: EN-US;
						"
						>Đồ</span
					></span
				><span
					lang="EN-US"
					style="
						mso-fareast-font-family: 'Times New Roman';
						mso-ansi-language: EN-US;
					"
				>
					<span class="SpellE">đạt</span> <span class="SpellE">trang</span>
					<span class="SpellE">thiết</span> <span class="SpellE">bị</span>
					<span class="SpellE">trong</span> <span class="SpellE">phòng</span>
					<span class="SpellE">trọ</span> <span class="SpellE">phải</span>
					<span class="SpellE">có</span> <span class="SpellE">trách</span>
					<span class="SpellE">nhiệm</span> <span class="SpellE">bảo</span>
					<span class="SpellE">quản</span> <span class="SpellE">cẩn</span>
					<span class="SpellE">thận</span> <span class="SpellE">không</span>
					<span class="SpellE">làm</span> <span class="SpellE">hư</span>
					<span class="SpellE">hỏng</span> <span class="SpellE">mất</span>
					<span class="SpellE">mát</span>.</span
				><span lang="EN-US"> </span
				><span
					lang="EN-US"
					style="
						mso-fareast-font-family: 'Times New Roman';
						mso-ansi-language: EN-US;
					"
					><o:p></o:p
				></span>
			</p>

			<p
				style="
					margin-top: 6pt;
					margin-right: 0cm;
					margin-bottom: 6pt;
					margin-left: 18pt;
					line-height: 115%;
				"
			>
				<span class="SpellE"
					><strong
						><span lang="EN-US" style="mso-ansi-language: EN-US"
							>Điều</span
						></strong
					></span
				><strong
					><span lang="EN-US" style="mso-ansi-language: EN-US">
						5:</span
					></strong
				><span lang="EN-US" style="mso-ansi-language: EN-US">
					<span class="SpellE">Điều</span> <span class="SpellE">khoản</span>
					<span class="SpellE">chung</span>.</span
				><span lang="EN-US"> </span
				><span lang="EN-US" style="mso-ansi-language: EN-US"><o:p></o:p></span>
			</p>

			<p
				class="MsoNormal"
				style="
					margin-top: 6pt;
					margin-right: 0cm;
					margin-bottom: 6pt;
					margin-left: 54pt;
					text-indent: -18pt;
					line-height: 115%;
					mso-list: l6 level1 lfo14;
					tab-stops: list 36pt;
				"
			>
				<![if !supportLists]><span
					lang="EN-US"
					style="
						font-size: 10pt;
						mso-bidi-font-size: 12pt;
						line-height: 115%;
						font-family: Symbol;
						mso-fareast-font-family: Symbol;
						mso-bidi-font-family: Symbol;
						mso-ansi-language: EN-US;
					"
					><span style="mso-list: Ignore"
						>·<span style="font: 7pt 'Times New Roman'"
							>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						</span></span
					></span
				><![endif]><span class="SpellE"
					><span
						lang="EN-US"
						style="
							mso-fareast-font-family: 'Times New Roman';
							mso-ansi-language: EN-US;
						"
						>Bên</span
					></span
				><span
					lang="EN-US"
					style="
						mso-fareast-font-family: 'Times New Roman';
						mso-ansi-language: EN-US;
					"
				>
					A <span class="SpellE">và</span> <span class="SpellE">bên</span> B
					<span class="SpellE">thực</span> <span class="SpellE">hiện</span>
					<span class="SpellE">đúng</span> <span class="SpellE">các</span>
					<span class="SpellE">điều</span> <span class="SpellE">khoản</span>
					<span class="SpellE">ghi</span> <span class="SpellE">trong</span>
					<span class="SpellE">hợp</span>
					<span class="SpellE">đồng</span>.</span
				><span lang="EN-US"> </span
				><span
					lang="EN-US"
					style="
						mso-fareast-font-family: 'Times New Roman';
						mso-ansi-language: EN-US;
					"
					><o:p></o:p
				></span>
			</p>

			<p
				class="MsoNormal"
				style="
					margin-top: 6pt;
					margin-right: 0cm;
					margin-bottom: 6pt;
					margin-left: 54pt;
					text-indent: -18pt;
					line-height: 115%;
					mso-list: l6 level1 lfo14;
					tab-stops: list 36pt;
				"
			>
				<![if !supportLists]><span
					lang="EN-US"
					style="
						font-size: 10pt;
						mso-bidi-font-size: 12pt;
						line-height: 115%;
						font-family: Symbol;
						mso-fareast-font-family: Symbol;
						mso-bidi-font-family: Symbol;
						mso-ansi-language: EN-US;
					"
					><span style="mso-list: Ignore"
						>·<span style="font: 7pt 'Times New Roman'"
							>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						</span></span
					></span
				><![endif]><span class="SpellE"
					><span
						lang="EN-US"
						style="
							mso-fareast-font-family: 'Times New Roman';
							mso-ansi-language: EN-US;
						"
						>Trường</span
					></span
				><span
					lang="EN-US"
					style="
						mso-fareast-font-family: 'Times New Roman';
						mso-ansi-language: EN-US;
					"
				>
					<span class="SpellE">hợp</span> <span class="SpellE">có</span>
					<span class="SpellE">tranh</span> <span class="SpellE">chấp</span>
					<span class="SpellE">hoặc</span> <span class="SpellE">một</span>
					<span class="SpellE">bên</span> vi <span class="SpellE">phạm</span>
					<span class="SpellE">hợp</span> <span class="SpellE">đồng</span>
					<span class="SpellE">thì</span> <span class="SpellE">hai</span>
					<span class="SpellE">bên</span> <span class="SpellE">cùng</span>
					<span class="SpellE">nhau</span> <span class="SpellE">bàn</span>
					<span class="SpellE">bạc</span> <span class="SpellE">giải</span>
					<span class="SpellE">quyết</span>, <span class="SpellE">nếu</span>
					<span class="SpellE">không</span> <span class="SpellE">giải</span>
					<span class="SpellE">quyết</span> <span class="SpellE">được</span>
					<span class="SpellE">thì</span> <span class="SpellE">yêu</span>
					<span class="SpellE">cầu</span> <span class="SpellE">cơ</span>
					<span class="SpellE">quan</span> <span class="SpellE">có</span>
					<span class="SpellE">thẩm</span> <span class="SpellE">quyền</span>
					<span class="SpellE">giải</span>
					<span class="SpellE">quyết</span>.</span
				><span lang="EN-US"> </span
				><span
					lang="EN-US"
					style="
						mso-fareast-font-family: 'Times New Roman';
						mso-ansi-language: EN-US;
					"
					><o:p></o:p
				></span>
			</p>

			<p
				class="MsoNormal"
				style="
					margin-top: 6pt;
					margin-right: 0cm;
					margin-bottom: 6pt;
					margin-left: 54pt;
					text-indent: -18pt;
					line-height: 115%;
					mso-list: l6 level1 lfo14;
					tab-stops: list 36pt;
				"
			>
				<![if !supportLists]><span
					lang="EN-US"
					style="
						font-size: 10pt;
						mso-bidi-font-size: 12pt;
						line-height: 115%;
						font-family: Symbol;
						mso-fareast-font-family: Symbol;
						mso-bidi-font-family: Symbol;
						mso-ansi-language: EN-US;
					"
					><span style="mso-list: Ignore"
						>·<span style="font: 7pt 'Times New Roman'"
							>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						</span></span
					></span
				><![endif]><span class="SpellE"
					><span
						lang="EN-US"
						style="
							mso-fareast-font-family: 'Times New Roman';
							mso-ansi-language: EN-US;
						"
						>Hợp</span
					></span
				><span
					lang="EN-US"
					style="
						mso-fareast-font-family: 'Times New Roman';
						mso-ansi-language: EN-US;
					"
				>
					<span class="SpellE">đồng</span> <span class="SpellE">được</span>
					<span class="SpellE">lập</span> <span class="SpellE">thành</span>
					<span class="SpellE">hai</span> (02) <span class="SpellE">bản</span>
					<span class="SpellE">có</span> <span class="SpellE">giá</span>
					<span class="SpellE">trị</span> <span class="SpellE">ngang</span>
					<span class="SpellE">nhau</span>, <span class="SpellE">mỗi</span>
					<span class="SpellE">bên</span> <span class="SpellE">giữ</span>
					<span class="SpellE">một</span> (01)
					<span class="SpellE">bản</span></span
				><span lang="EN-US"> </span
				><span
					lang="EN-US"
					style="
						mso-fareast-font-family: 'Times New Roman';
						mso-ansi-language: EN-US;
					"
					><o:p></o:p
				></span>
			</p>

			<p
				style="
					margin-top: 6pt;
					margin-right: 0cm;
					margin-bottom: 6pt;
					margin-left: 18pt;
					line-height: 115%;
				"
			>
				<span lang="EN-US" style="mso-ansi-language: EN-US">&nbsp;</span
				><span lang="EN-US"> </span
				><span lang="EN-US" style="mso-ansi-language: EN-US"><o:p></o:p></span>
			</p>

			<p
				align="right"
				style="
					margin-top: 6pt;
					margin-right: 0cm;
					margin-bottom: 6pt;
					margin-left: 18pt;
					text-align: right;
					line-height: 115%;
				"
			>
				<span class="SpellE"
					><span lang="EN-US" style="mso-ansi-language: EN-US">Hà</span></span
				><span lang="EN-US" style="mso-ansi-language: EN-US">
					<span class="SpellE">Nội</span>, <span class="SpellE">ngày</span>
					<span style="mso-spacerun: yes">  </span></span
				><span class="MsoCommentReference"
					><span
						lang="EN-US"
						style="font-size: 8pt; line-height: 115%; mso-ansi-language: EN-US"
						>&nbsp;</span
					></span
				><span class="SpellE"
					><span lang="EN-US" style="mso-ansi-language: EN-US"
						>tháng</span
					></span
				><span lang="EN-US" style="mso-ansi-language: EN-US">
					<span style="mso-spacerun: yes">  </span></span
				><span class="MsoCommentReference"
					><span
						lang="EN-US"
						style="font-size: 8pt; line-height: 115%; mso-ansi-language: EN-US"
						>&nbsp;</span
					></span
				><span class="SpellE"
					><span lang="EN-US" style="mso-ansi-language: EN-US">năm</span></span
				><span lang="EN-US" style="mso-ansi-language: EN-US"> <o:p></o:p></span>
			</p>

			<p
				style="
					margin-top: 6pt;
					margin-right: 0cm;
					margin-bottom: 6pt;
					margin-left: 18pt;
					line-height: 115%;
				"
			>
				<strong
					><span
						lang="EN-US"
						style="font-size: 14pt; line-height: 115%; mso-ansi-language: EN-US"
						>&nbsp;</span
					></strong
				><span lang="EN-US"> </span
				><span lang="EN-US" style="mso-ansi-language: EN-US"><o:p></o:p></span>
			</p>

			<p
				align="center"
				style="
					margin-top: 6pt;
					margin-right: 0cm;
					margin-bottom: 6pt;
					margin-left: 18pt;
					text-align: center;
					line-height: 115%;
				"
			>
				<strong
					><span
						lang="EN-US"
						style="font-size: 14pt; line-height: 115%; mso-ansi-language: EN-US"
						>BÊN A&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
						&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
						&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
						&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
						&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; BÊN B</span
					></strong
				><span lang="EN-US"> </span
				><span lang="EN-US" style="mso-ansi-language: EN-US"><o:p></o:p></span>
			</p>

			<p
				align="center"
				style="
					margin-top: 6pt;
					margin-right: 0cm;
					margin-bottom: 6pt;
					margin-left: 18pt;
					text-align: center;
					line-height: 115%;
				"
			>
				<span lang="EN-US" style="mso-ansi-language: EN-US">&nbsp;</span
				><span lang="EN-US"> </span
				><span lang="EN-US" style="mso-ansi-language: EN-US"><o:p></o:p></span>
			</p>

			<p
				style="
					margin-top: 6pt;
					margin-right: 0cm;
					margin-bottom: 6pt;
					margin-left: 18pt;
					line-height: 115%;
				"
			>
				<span lang="EN-US" style="mso-ansi-language: EN-US">&nbsp;</span
				><span lang="EN-US"> </span
				><span lang="EN-US" style="mso-ansi-language: EN-US"><o:p></o:p></span>
			</p>

			<p
				style="
					margin-top: 6pt;
					margin-right: 0cm;
					margin-bottom: 6pt;
					margin-left: 0cm;
					text-indent: 36pt;
					line-height: 115%;
				"
			>
				<strong
					><span lang="EN-US" style="mso-ansi-language: EN-US"
						>${lessor?.name?.toLocaleUpperCase()}</span
					></strong
				><span lang="EN-US" style="color: red; mso-ansi-language: EN-US"
					>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
					&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span
						style="mso-tab-count: 3"
						> </span
					><span class="GramE">
						&nbsp;<strong><span style="color: black">
                        ${roomRentalDetail?.customerName.toLocaleUpperCase()}</span></strong></span
					></span
				> 
			</p>
		</div>
	</body>
</html>
`;
    const source =
        'data:application/vnd.ms-word;charset=utf-8,' +
        encodeURIComponent(sourceHTML);
    const fileDownload = document.createElement('a');
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = 'HDTT.doc';
    fileDownload.click();
    document.body.removeChild(fileDownload);
};

export {
    generatePriceToVND,
    useGetParam,
    exportHtmlToWord,
    convertDate,
    generateFileToBase64,
};
