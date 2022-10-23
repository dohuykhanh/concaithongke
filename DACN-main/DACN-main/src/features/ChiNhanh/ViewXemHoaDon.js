import React, { useState, useEffect,useRef } from "react";
// import  "./cartcss.css" 
import { Button, Modal} from 'react-bootstrap'
import axios from "axios";
import moment from 'moment';
import ReactToPrint, { useReactToPrint } from 'react-to-print';




const Viewxemhoadon = ({ cart, setCart, handleChange,Data, setData ,closemodal, Manghoadon,IDnguoiban, Chitiethoadon}) => {
    // const [Data, setData] = useState([]);
    const [Data1, setData1] = useState([]);
    const [Data2, setData2] = useState([]);

    const [Dataa, setDataa] = useState([]);
    const [cn, setcn] = useState("")
    const [id,setId] = useState("");

    let Idnguoiban=IDnguoiban;
    console.log("id thang ban truyen qua", Idnguoiban)
    let hoadoncua=Idnguoiban;
  
    var Tenchinhanh= localStorage.getItem("TenChiNhanh");
    console.log("chinhanh",Tenchinhanh)
    var ChiNhanh=Tenchinhanh;
    let Gia;
    let TenVatTu;
    let SoLuong;
    let NgaySanXuat;
    let NgayHetHan;
    let idd;



    const Getallchitiethoadon = async () => {
              
        const url = `http://localhost:5001/HoaDon/h/${hoadoncua}`
        axios.get(url)
                  .then(response => {
                      const result = response.data;
                      const { status, message, data } = result;
                      if (status !== 'SUCCESS') {
                          alert(message, status)
                      }
                      else {
                        setData2(data)
                        //   console.log("choa em a dugn day tu chiu 55555",Chitiethoadon)
                        //   Chitiethoadon.map(x =>x.map(y=> console.log("y la sdfd", y)))
                        console.log("mang data cua khanh",data)
                      }
                  })
                  .catch(err => {
                      console.log(err)
                  })

                
                }

    console.log("cai mang chet tiet", Manghoadon)

    const Getvattuu = async () => {

        const url = `http://localhost:5001/VatTu/c/${Tenchinhanh}`
        axios.get(url)
                  .then(response => {
                      const result = response.data;
                      const { status, message, data } = result;
                      if (status !== 'SUCCESS') {
                          alert(message, status)
                      }
                      else {
                          setDataa(data)
                          console.log(data)
                      }
                  })
                  .catch(err => {
                      console.log(err)
                  })
                }
      

                const handleEdit = (TenVatTu, SoLuong,NgaySanXuat,NgayHetHan, ChiNhanh, Gia,idd) =>{
                    const url = `http://localhost:5001/VatTu/${idd}`
                    
                    const Credentials = { TenVatTu, SoLuong,NgaySanXuat,NgayHetHan, ChiNhanh, Gia}
                    axios.put(url, Credentials)
                        .then(response => {
                            const result = response.data;
                            const { status, message } = result;
                          
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }






    const handleDelete = () =>{
        
        const url = `http://localhost:5001/PhieuChuyen/${id}`
        axios.delete(url)
            .then(response => {
                const result = response.data;
                const { status, message } = result;
                if (status !== 'SUCCESS') {
                    alert(message, status)
                }
                else {
                    alert(message)
                    window.location.reload()
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
  
    // const Getvattu = async () => {
  
    //   const url = `http://localhost:5001/PhieuChuyen/c/${Tenchinhanh}`
    //   axios.get(url)
    //             .then(response => {
    //                 const result = response.data;
    //                 const { status, message, data } = result;
                    
    //                 if (status !== 'SUCCESS') {
    //                     alert(message, status)
    //                 }
    //                 else {
    //                     setData(data)
    //                     console.log(data)
    //                     // setData1(Data[0].SanPham)
                        
    //                     // console.log("dataaaa1",Data1)
    //                 }
    //             })
    //             .catch(err => {
    //                 console.log(err)
    //             })
    //           }

    let chitiett;
    let Chitiett =[];
    let nhat =1;
    let khanh=5;
              const handleclick = () => {
                // setData1([]);
                // for(let i = 0; i < Manghoadon.length; i++) {
                //     setData1([...Manghoadon[i].SanPham]);
                // }
                
            Manghoadon.map((item) =>{
                   console.log("thang item day ne",item._id)
                //    for(let i = 0; i < Manghoadon.length;i++){
                //     if()
                //    }
              
                if(Idnguoiban===item.NguoiBan){
                    console.log("vo ham if dc r")
                    console.log("check ben trong vong lap",item._id)
                    // Data1.push(item.SanPham)
                   chitiett={ ChiNhanh: item.ChiNhanh,
                    Gia: item.Gia,
                    NgayBan: item.NgayBan,
                      _id: item._id}
                      Chitiett.push(chitiett)
                    nhat++;
                    khanh=khanh +1;
                    // setData1([{
                    // //   ChiNhanh: item.ChiNhanh,
                    // //   Gia: item.Gia,
                    // //   NgayHetHan: item.NgayHetHan,
                    // //   NgaySanXuat: item.NgaySanXuat,
                    // //   SoLuong: item.SoLuong,
                    // //   TenVatTu: item.TenVatTu,
                    // ChiNhanh: item.ChiNhanh,
                    // Gia: item.Gia,
                    // NgayBan: item.NgayBan,
                    //   _id: item._id
                    // }])
                    setData1([chitiett])
                    // Data1.push([chitiett])
                    console.log("cai man gtron gvong l.ap",Data1)
                    
                }
                  
                })
                console.log("dataaaa1khanhoidayne",Data1)
                console.log("cai mang chet tiet khanh1", Manghoadon)
                console.log("NHat dep trai",Chitiett)
        }

        const handleclickxacthuc = () => {
            //   hoadon.push(item);
            //   handleEditShow();
            // console.log("bien carrt", cart)
          
          
          
            
           
            console.log("Dataakhanh1", Dataa)
            console.log("Dataakhanh2", Data1)
            for(let i=0; i<Dataa.length; i++) {
              for(let j=0; j<Data1.length;j++){
                if(Dataa[i].MaVT===Data1[j][i].MaVT){
                  console.log("DataakhanhID1", Dataa[i].TenVatTu)
                  console.log("DataakhanhID2", Data1[j][i].TenVatTu)
                //   console.log("DataakhanhSP1", Data1[j][i].Gia)
                  
                //   console.log("DataakhanhSP3",Data1[j][i].NgaySanXuat )
                //   console.log("DataakhanhSP4", Data1[j][i].NgayHetHan)
                //   console.log("DataakhanhSP5", Data1[j][i]._id)
                  
          
                  Gia = Data1[j][i].Gia;
                  TenVatTu = Data1[j][i].TenVatTu;
                  NgaySanXuat= Data1[j][i].NgaySanXuat;
                  NgayHetHan= Data1[j][i].NgayHetHan;
                  idd=Dataa[i]._id;
          
                  let sltruoc=Dataa[i].SoLuong;
                  let slsau=Data1[j][i].SoLuong;
                  let slcannhap= sltruoc+slsau;
                  SoLuong=slcannhap;
                  ChiNhanh=Dataa[i].ChiNhanh
                  console.log("DataakhanhSP1", TenVatTu)
                  console.log("DataakhanhSP2",  SoLuong)
                  console.log("DataakhanhSP3",NgaySanXuat )
                  console.log("DataakhanhSP4", NgayHetHan)
                  console.log("DataakhanhSP5", ChiNhanh)
                  console.log("DataakhanhSP6", slcannhap)
                  console.log("DataakhanhSP7", idd)
                  console.log("DataakhanhSP7", Dataa[i]._id)
                  handleEdit(TenVatTu, SoLuong,NgaySanXuat,NgayHetHan, ChiNhanh, Gia,idd);
                }
              }
          }
            
            // handleEditShow();
            alert("xax thuc thanh cong");
           
          
          }











              useEffect(() => {
                Getallchitiethoadon();
               
            }, [])

            


            
  return (
   
<div className="modalBackground">
    <div className="modalContainer">
       
{/* <Button size='sm' variant='primary' onClick={handleclick}>Xem</Button>| */}
<div className='row'>
                <div className='table-responsive'>
                    <table className='table table-striped table-hover table-bordered'>
                        <thead>
                            <tr>
                                <th>Ngay Ban</th>
                                <th>Gia</th>
                               
                                <th>Soluong san pham ban dc</th>
                            </tr>
                        </thead>
                        <tbody> 
                            {/* {Data1.map((item) => item.map((it)=>
                            <tr key={it._id}>
                            <td>{it.TenVatTu}</td>
                             <td>{it.SoLuong}</td>
                           
                             <td>{it.Gia}</td>
                            
                            
                         </tr>
                         
                            )
                            
                            )} */}


{Data2.map((item) =>
                                <tr key={item._id}>
                                    <td>{item.NgayBan}</td>
                                    <td>{item.Gia}</td>
                                    <td>{item.SanPham.length}</td>
                               
                                    {/* <td style={{ minWidth: 190 }}>
                                        <Button size='sm' variant='primary' onClick={() => { handleViewShoww();setId(item._id) }}>View</Button>|
                                        <Button size='sm' variant='warning' onClick={()=> {handleEditShow(SetRowData(item),setsdt(item.sdt),sethoten(item.hoten),setId(item._id))}}>Edit</Button>|
                                        <Button size='sm' variant='danger' onClick={() => {handleViewShow(SetRowData(item),setId(item._id), setDelete(true))}}>Delete</Button>|
                                        <Button size='sm' variant='warning' onClick={()=> {handleMoveShow(SetRowData(item),setId(item._id),setsdt(item.sdt),sethoten(item.hoten),setidtb(item._id))}}>Move-To</Button>|
                                    </td> */}
                                </tr>
                            )}
                           
                        </tbody>
                        {/* <tbody>
                            {Data.map((item) => 
                            <tr key={item._id}>
                            <td></td>
                             <td></td>
                           
                             <td></td>
                             <td>
                             <Button size='sm' variant='primary'onClick={() => {handleDelete(setId(item._id))}} >Xóa</Button>|
                             <Button size='sm' variant='primary'onClick={handleclickxacthuc} >XAC THUC</Button>|
                             </td>
                            
                            
                         </tr>
                         
                            
                            
                            )}
                           
                        </tbody> */}
                    </table>

                    

                </div>
            </div>


            <button className={"nut"} onClick={() => closemodal(false)}> X </button>
            </div>
</div>



  );
};

export default Viewxemhoadon;



