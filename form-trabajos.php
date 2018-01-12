<div id="newWork">
  <div class="page-title">
    <div class="form-group col-md-12 col-sm-12 col-xs-12 header_tablas">
        
    </div>
  </div>

  <div class="clearfix"></div>

  <div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="x_panel">
        <div class="x_title">
          <h2>NUEVO TRABAJO</h2>
          <ul class="nav navbar-right panel_toolbox">
          </ul>
          <div class="clearfix"></div>
        </div>

        <div id="wizard" class="form_wizard wizard_horizontal">
                  
          <ul class="wizard_steps anchor">
            <li>
              <a href="#step-1" class="selected" isdone="1" rel="1">
                <span class="step_no">1</span>
                <span class="step_descr">
                  Paso 1<br>
                </span>
              </a>
            </li>
            <li>
              <a href="#step-2" class="disabled" isdone="0" rel="2">
                <span class="step_no">2</span>
                <span class="step_descr">
                  Paso 2<br>
                </span>
              </a>
            </li>
            <li>
              <a href="#step-3" class="disabled" isdone="0" rel="3">
                <span class="step_no">3</span>
                <span class="step_descr">
                  Paso 3<br>
                </span>
              </a>
            </li>
            <li>
              <a href="#step-4" class="disabled" isdone="0" rel="4">
                <span class="step_no">4</span>
                <span class="step_descr">
                  Paso 4<br>
                </span>
              </a>
            </li>
          </ul>

          <div class="stepContainer">
            <div id="step-1" class="wizard_content" style="display: block; overflow: hidden;">
              <form class="form-horizontal form-label-left input_mask" id="FormStep1">
                
                <!-- PRIMERA FILA -->
                  <div class="col-md-12 col-sm-12 col-xs-12 no-pading" style="margin-bottom: 15px;">

                    <div class="col-md-4 col-sm-4 col-xs-8 form-group">
                      <label for="">Cliente</label><span style="color: red;">*</span>
                      <select name="txt_cliente" id="txt_cliente" class="form-control selectFormStep1">
                      </select>
                    </div>

                    <div class="col-md-2 col-sm-2 col-xs-4 form-group btn-group btn-form">
                    	<button data-toggle="dropdown" class="btn btn-success dropdown-toggle col-md-12 col-sm-12 col-xs-12" type="button" aria-expanded="false">
  	                  	Opciones &nbsp&nbsp&nbsp&nbsp
  	                  	<span class="caret"></span>
  	                  </button>
                      <ul class="dropdown-menu" role="menu" aria-labelledby="toggleOptions">
                        <li><a href="#" onclick="" id="editCliente">Editar cliente</a></li>
                        <!-- <li><a href="#" onclick="AddCliente();" id="newCliente">Nuevo cliente</a></li> -->
                      </ul>
                    </div>

                    <div class="col-md-3 col-sm-3 col-xs-6 form-group">
                      <label for="">Fecha de solicitud</label>
                      <input type="date" name="txt_fecha" id="txt_fecha" class="form-control txtFormStep1">
                    </div>
                    <div class="col-md-3 col-sm-3 col-xs-6 form-group">
                      <label for="">Hora de solicitud</label>
                      <input type="time" name="txt_hora" id="txt_hora" class="form-control txtFormStep1">
                    </div>

                  </div>
                <!-- FIN PRIMERA FILA -->
                  
                <!-- SEGUNDA FILA -->
                  <div class="col-md-12 col-sm-12 col-xs-12 no-pading" style="margin-bottom: 15px;">

                    <hr>
                    
                    <div class="col-md-6 col-sm-12 col-xs-12 form-group">
                        <label>Información del cliente: </label>
                        <div class="well col-md-12 col-sm-12 col-xs-12" style="overflow: auto">

                       		<div class="col-md-6 col-sm-3 col-xs-6 no-pading">
  	                      	<label>Encargado: </label>
  	                        <p id="p_nombre">
  	                          <!-- José Angel Torres López.  -->
  	                        </p>
  	                      </div>

  	                      <div class="col-md-6 col-sm-3 col-xs-6 no-pading">
  	                      	<label>RFC: </label>
  	                        <p id="p_rfc">
  	                          <!-- TOLA930516HCMRPN00  -->
  	                        </p>
  	                      </div>

  	                      <div class="col-md-6 col-sm-3 col-xs-6 no-pading">
  	                      	<label>Telefonos: </label>
  	                        <p id="p_tel">
  	                          <!-- 3121506956 | 3129148  -->
  	                        </p>
  	                      </div>

  	                      <div class="col-md-6 col-sm-3 col-xs-6 no-pading">
  	                      	<label>Correo: </label>
  	                        <p id="p_email">
  	                          <!-- thekamitorres@gmail.com  -->
  	                        </p>
  	                      </div>
                        </div>
                    </div>

                    <div class="col-md-6 col-sm-12 col-xs-12">
                      <label>Detalles del servicio: </label>
                      <textarea class="col-md-12 col-sm-12 col-xs-12 form-control txtFormStep1" style="overflow: auto; height: 90px; resize: none;" id="txt_detalles"></textarea>
                    
                    </div>

                  </div>
                <!-- FIN SEGUNDA FILA -->

                <!-- TERCERA FILA -->
                  <div class="col-md-12 col-sm-12 col-xs-12 no-pading" style="margin-bottom: 15px;">
                    
                    <hr>

                    <div class="col-md-6 col-sm-12 col-xs-12 form-group" style="margin-top: 15px;">

                      <div class="col-md-12 col-sm-12 col-xs-12 no-pading">


                        <div class="form-group col-md-12 col-sm-12 col-xs-12 no-pading">
                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="first-name" style="text-align: left;">
                            Alias de Trabajo:  
                            <span style="color: red;">*</span>
                          </label>
                          <div class="col-md-9 col-sm-9 col-xs-12">
                            <input type="text" class="form-control txtFormStep1 col-xs-12 txt_otro" name="txt_alias" placeholder="EJEMPLO: 'BOD-PADRE', 'COPP-COLCH'.." id="txt_alias">
                          </div>
                        </div>


                        <div class="form-group col-md-12 col-sm-12 col-xs-12 no-pading">
                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="first-name" style="text-align: left;">
                            Recibido via:  
                            <span style="color: red;">*</span>
                          </label>
                          <div class="col-md-9 col-sm-9 col-xs-12">

                            <select id="select_via" name="select_via" class="form-control selectFormStep1 col-xs-12">
                              <option value="0" selected disabled>Seleccione una opción</option>
                              <option value="Email">Email</option>
                              <option value="WhatApp">WhatApp</option>
                              <option value="SMS">SMS</option>
                              <option value="Otro">Otro</option>
                            </select>
                            
                          </div>
                        </div>

                        <div class="form-group col-md-12 col-sm-12 col-xs-12 no-pading" style="margin-top: 33px;" id="div_txt_otro" hidden="">
                          <label class="control-label col-md-3 col-sm-3 col-xs-12" for="first-name" style="text-align: left;">
                            Otra via:  
                            <span style="color: red;">*</span>
                          </label>
                          <div class="col-md-9 col-sm-9 col-xs-12">

                            <input type="text" class="form-control txtFormStep1 col-xs-12 txt_otro" name="txt_otro" placeholder="Especifique.." id="txt_otro" hidden>
                            
                          </div>
                        </div>
                          
                        
                        
                      </div>

                    </div>

                    <div class="col-md-6 col-sm-12 col-xs-12 no-pading">

                        <div class="col-md-12 col-sm-6 col-xs-12 no-pading" style=" margin-bottom: 10px;">
                          <div class="col-md-6 col-sm-6 col-xs-12">
                            <label>Vigencia promoción Inicio</label>
                            <input type="date" class="form-control txtFormStep1 col-md-12 col-sm-12 col-xs-12" name="txt_vigencia" placeholder="Especifique.." id="txt_vigencia">
                          </div>

                          <div class="col-md-6 col-sm-6 col-xs-12">
                            <label>Vigencia promoción Fin</label>
                            <input type="date" class="form-control txtFormStep1 col-md-12 col-sm-12 col-xs-12" name="txt_vigencia" placeholder="Especifique.." id="txt_vigenciafin">
                          </div>
                        </div>

                        <div class="col-md-12 col-sm-6 col-xs-12 no-pading">
                          
                          <div class="col-md-6 col-sm-6 col-xs-12">
                            <label>Periodo inicio:</label>
                            <input type="date" class="form-control txtFormStep1 col-md-12 col-sm-12 col-xs-12" name="txt_periodo" placeholder="Especifique.." id="txt_periodoini">
                          </div>

                          <div class="col-md-6 col-sm-6 col-xs-12">
                           <label>Periodo término:</label>
                            <input type="date" class="form-control txtFormStep1 col-md-12 col-sm-12 col-xs-12" name="txt_periodo" placeholder="Especifique.." id="txt_periodofin">
                          </div>

                        </div>

                        <div class="col-md-12 col-sm-6 col-xs-12 no-pading">

                          <div class="col-md-6 col-sm-6 col-xs-12">
                            <label>Tipo de servicio: </label>
                            <select class="form-control txtFormStep1 col-xs-12" id="select_servicio">
                              <option value="0" selected disabled>Seleccione una opción</option>
                              <option value="Volanteo">Volanteo</option>
                              <option value="Perifoneo">Perifoneo</option>
                            </select>
                          </div>

                          <div id="cantidadDiv" class="col-md-6 col-sm-6 col-xs-12">
                            <!-- <label>Cantidad:</label>
                            <input type="text" class="form-control txtFormStep1 col-md-12 col-sm-12 col-xs-12" name="txt_cantidadP1" placeholder="Cantidad.." id="txt_cantidadP1">
                            <div class="input-group">
                              <input type="text" class="form-control" placeholder="Search for...">
                              <span class="input-group-btn">
                                <button class="btn btn-default" type="button"><span class="glyphicon glyphicon-th"></span></button>
                              </span>
                            </div> -->
                          </div>

                        </div>

                        <!-- <div class="col-md-12 col-sm-6 col-xs-12" style=" margin-top: 20px;">
                          <div class="radio radio-inline radio-mio col-md-3 col-sm-3 col-xs-3 radio-mio2">
                            <label style="padding-left: 0">
                              <input type="radio" class="flat" name="servicio" value="Volanteo">
                              Volanteo
                            </label>
                          </div>
                          <div class="radio radio-inline radio-mio col-md-4 col-sm-4 col-xs-4 radio-mio2" style="margin-left: 0px;">
                            <label>
                              <input type="radio" class="flat" name="servicio" value="Perifoneo">Perifoneo
                            </label>
                          </div>
                          <div class="form-group col-md-5 col-sm-5 col-xs-5">
                            <label>Cantidad:</label>
                            <input type="text" class="form-control col-md-12 col-sm-12 col-xs-12 " name="txt_cantidadP1" placeholder="Cantidad.." id="txt_cantidadP1">
                          </div>
                        </div> -->

                    </div>

                  </div>
                <!-- FIN TERCERA FILA -->

              </form>
            </div>

            <div id="step-2" class="wizard_content" style="display: none;">
              
              <!-- PRIMERA FILA -->
                
                <div class="col-md-12 col-sm-12 col-xs-12 no-pading">

                  <div class="col-md-5 col-sm-5 col-xs-12 form-group">

                    <div class="form-group col-md-12 col-sm-12 col-xs-12">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12" for="first-name">Bloque <span style="color: red;">*</span>
                      </label>
                      <div class="col-md-9 col-sm-9 col-xs-12">

                        <select id="txt_estadoT" name="txt_estadoT" class="form-control selectFormStep2"></select>
                        
                      </div>
                    </div>

                    <div class="form-group col-md-12 col-sm-12 col-xs-12">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12" for="first-name">Cantidad <span style="color: red;">*</span>
                      </label>
                      <div class="col-md-9 col-sm-9 col-xs-12">
                        <input type="text" id="txt_cantidadP2" placeholder="Ej. 500" name="txt_cantidadP2" value="0" class="form-control txtFormStep2">
                      </div>
                    </div>

                    <div class="form-group col-md-12 col-sm-12 col-xs-12">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12" for="first-name">Sumatoria <span style="color: red;">*</span>
                      </label>
                      <div class="col-md-9 col-sm-9 col-xs-12">
                        <input type="text" id="txt_sumatoria" name="txt_sumatoria" class="form-control txtFormStep2" disabled>
                      </div>
                    </div>

                    <div class="form-group col-md-12 col-sm-12 col-xs-12">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12" for="first-name">Diferencia <span style="color: red;">*</span>
                      </label>
                      <div class="col-md-9 col-sm-9 col-xs-12">
                        <input type="text" id="txt_diferencia" name="txt_diferencia" class="form-control txtFormStep2" disabled>
                      </div>  
                    </div>

                    <div class="form-group col-md-12 col-sm-12 col-xs-12">
                      <button id="btn_nuevaArea" class="btn btn-success col-md-9 col-sm-9 col-xs-12" style="float: right;margin: 10px;" disabled>Guardar</button>
                    </div>

                  </div>
                  
                  <div class="col-md-7 col-sm-7 col-xs-12">

                    <div class="col-md-12 col-sm-12 col-xs-12 no-pading" hidden id="alert-edit">
                      <div class="alert alert-success alert-dismissible fade in" role="alert">
                        <button type="button" class="close" onclick="closealert()"><span aria-hidden="true">×</span>
                        </button>
                        <p style="font-size: 19px;"><strong>Atención!</strong> Si quieres editar este bloque, presiona <a class="editTrab" href="#" onclick="edit()">aquí</a></p>
                      </div>
                    </div>
                    
                    <div class="col-md-12 col-sm-12 col-xs-12 form-group has-feedback tableContainer table-responsive table-bordered divFormStep2" id="tableContainerMuns" style="padding: 0;height: 220px;"">
                      <table class="table table-bordered">
                        <thead id="thead2">
                          <tr>
                            <th colspan="2" style="width: 75%">SUCURSALES</th>
                            <th>CANTIDAD</th>
                          </tr>
                        </thead>
                        <tbody id="tbody2">
                          <!-- <tr>
                            <td style="width: 2%;padding-left: 15px;">
                              <div class="checkbox">
                                <label>
                                  <input type="checkbox" id="ch_1" class="checksMuns" value="1">
                                </label>
                              </div>
                            </td>
                            <td style="width: 73%">
                              <center>
                                <label id="labelMun_1" style="margin-top: 15px;">
                                  Veracruz de Ignacio de la Llave
                                </label>
                              </center>
                            </td>
                            <td>
                              <input type="text" id="txt_cantidadMun_1" class="form-control" name="" style="margin-top: 5px;">
                            </td>
                          </tr>
                          <tr>
                            <td style="width: 2%;padding-left: 15px;">
                              <div class="checkbox">
                                <label>
                                  <input type="checkbox" id="ch_2" class="checksMuns" value="2">
                                </label>
                              </div>
                            </td>
                            <td style="width: 73%">
                              <center>
                                <label id="labelMun_2" style="margin-top: 15px;">
                                  Otro municipio
                                </label>
                              </center>
                            </td>
                            <td>
                              <input type="text" id="txt_cantidadMun_2" class="form-control" name="" style="margin-top: 5px;">
                            </td>
                          </tr> -->
                        </tbody>
                      </table>
                    </div>

                  </div>
                    

                  <div class="col-md-12 col-sm-12 col-xs-12 form-group">
                    
                    <hr>  
                    
                    <div class="form-group col-md-6 col-sm-6 col-xs-6">
                      <label class="control-label col-md-5 col-sm-5 col-xs-12" for="first-name">Cantidad/mins total(es)
                      </label>
                      <div class="col-md-7 col-sm-7 col-xs-12">
                        <input type="text" id="txt_cantidad_total" name="txt_cantidad_total" class="form-control" disabled>
                      </div>  
                    </div>

                    <div class="form-group col-md-6 col-sm-6 col-xs-6">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12" for="first-name">Diferencia total
                      </label>
                      <div class="col-md-9 col-sm-9 col-xs-12">
                        <input type="text" id="txt_diferencia_total" name="txt_diferencia_total" class="form-control" disabled>
                      </div>  
                    </div>

                  </div>
                    

                </div>
              <!-- FIN PRIMERA FILA -->

            </div>

            <div id="step-3" class="wizard_content" style="display: none;">
              
              <div class="x_panel">
                <div class="x_title">
                  <h2>Colima - 2000 volantes </h2>
                  <ul class="nav navbar-right panel_toolbox" style="min-width: 0px;">
                    <li><a class="collapse-link"><i class="fa fa-chevron-down"></i></a>
                    </li>
                  </ul>
                  <div class="clearfix"></div>
                </div>
                <div id="tableContainer" class="x_content table-responsive" style="display: block">

                  <!-- start project list -->
                  <table class="table table-striped projects table-bordered">
                      <thead id="theadStep3Z1">
                        <tr>
                          <th>Proveedor</th>
                          <th>Telefono</th>
                          <th>Cantidad</th>
                          <th>Municipios</th>
                          <th>Seleccionar</th>
                        </tr>
                      </thead>
                      <tbody id="tbodyStep3Z1">
                        <tr>
                          <td>Proveedor 1</td>
                          <td>345345634</td>
                          <td>
                            <input type="text" class="form-control" style="width: 60%" placeholder="Ej. 500">
                          </td>
                          <td>
                            <select name="" id="" class="form-control">
                              <option value="0" selcted>Cobertura</option>
                              <option value="1" disabled>Municipio 1</option>
                              <option value="2" disabled>Municipio 2</option>
                              <option value="3" disabled>Municipio 3</option>
                            </select>
                          </td>
                          <td style="width: 2%;padding-left: 15px;">
                            <div class="checkbox">
                              <label>
                                <input type="checkbox" id="ch_1" class="checksMuns" value="1">
                              </label>
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <td>Proveedor 2</td>
                          <td>345345634</td>
                          <td><input type="text" placeholder="Ej. 1000"></td>
                          <td>
                            <select name="" id="" class="form-control">
                              <option value="0" selcted>Cobertura</option>
                              <option value="1" disabled>Municipio 1</option>
                              <option value="2" disabled>Municipio 2</option>
                              <option value="3" disabled>Municipio 3</option>
                            </select>
                          </td>
                          <td style="width: 2%;padding-left: 15px;">
                            <div class="checkbox">
                              <label>
                                <input type="checkbox" id="ch_1" class="checksMuns" value="1">
                              </label>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                  </table>
                  <!-- end project list -->

                  <!-- <div class="col-xs-12 no-pading">

                    <div class="form-group col-xs-4 ">
                      <label for="">Municipios a cubrir</label>
                      <select name="" id="select_total" class="form-control" multiple="">
                        <option value="0">Municipio 0</option>
                        <option value="1">Municipio 1</option>
                        <option value="2">Municipio 2</option>
                        <option value="3">Municipio 3</option>
                        <option value="4">Municipio 4</option>
                        <option value="5">Municipio 5</option>
                      </select>
                    </div>

                    <div class="form-group col-xs-4 ">
                      <label for="">Municipios cubiertos</label>
                      <select name="" id="select_total" class="form-control" multiple="">
                        <option value="0">Municipio 0</option>
                        <option value="1">Municipio 1</option>
                        <option value="2">Municipio 2</option>
                        <option value="3">Municipio 3</option>
                      </select>
                    </div>

                    <div class="form-group col-xs-4 ">
                      <label for="">Municipios faltantes de cubrir</label>
                      <select name="" id="select_total" class="form-control" multiple="">
                        <option value="4">Municipio 4</option>
                        <option value="5">Municipio 5</option>
                      </select>
                    </div>
                  </div> -->


                  <div class="col-xs-12 no-pading">
                    <div class="col-xs-4" style="max-height: 150px; overflow-y: scroll">
                      <table class="table table-striped table-bordered">
                        <thead id="theadTotal">
                          <tr>
                            <th>Municipios a cubrir</th>
                          </tr>
                        </thead>
                        <tbody id="tbodyTotal">
                        </tbody>
                      </table>
                    </div>

                    <div class="col-xs-4" style="max-height: 150px; overflow-y: scroll">
                      <label for="">Municipios cubiertos</label>
                      <table class="table table-striped table-bordered">
                        <thead id="theadActual">
                          <tr>
                            <th>Nombre</th>
                            <th>Cantidad</th>
                          </tr>
                        </thead>
                        <tbody id="tbodyActual">
                        </tbody>
                      </table>
                    </div>

                    <div class="col-xs-4" style="max-height: 150px; overflow-y: scroll">
                      <table class="table table-striped table-bordered">
                        <thead id="theadFaltantes">
                          <tr>
                            <th>Municipios faltantes de cubrir</th>
                          </tr>
                        </thead>
                        <tbody id="tbodyFaltantes">
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              </div>

              <div class="x_panel">
                <div class="x_title">
                  <h2>Zona 3 - Nayarit - 2000 volantes</h2>
                  <ul class="nav navbar-right panel_toolbox" style="min-width: 0px">
                    <li><a class="collapse-link"><i class="fa fa-chevron-down"></i></a>
                    </li>
                  </ul>
                  <div class="clearfix"></div>
                </div>
                <div id="tableContainer" class="x_content table-responsive" style="display: none">

                  <!-- start project list -->
                  <table class="table table-striped projects">
                      <thead id="theadStep3Z1">
    
                      </thead>
                      <tbody id="tbodyStep3Z1">
                       
                      </tbody>
                  </table>
                  <!-- end project list -->

                  <div class="col-md-12">
                    <div class="col-md-2" style="margin-left: 20%;">
                      <img src="images/folder2.png" style="width: 100px;height: 100px;">
                    </div>
                    <div class="col-md-6" style="margin-top: 20px;">
                      <h3>No encontramos ninguna ptoveedor para atender esta zona</h3>
                    </div>
                 </div>

                </div>
              </div>

            </div>
            <div id="step-4" class="wizard_content" style="display: none;">
              
              <center>
                <h3>El proceso ha terminado!</h2>
                <h2>por favor de click en el siguiente boton para poder ver el resumen</h3>
                <button class="btn btn-success" id="ver_trabajos"> Ver trabajos </button>
              </center>
            </div>
          </div>

          <!-- <div class="actionBar">
            <a href="#" id="btn_finish" class="btn btn-default buttonDisabled">Finish</a>
            <a href="#" id="btn_next" class="btn btn-success">Next</a>
            <a href="#" id="btn_prev" class="btn btn-primary buttonDisabled">Previous</a>
          </div> -->

        </div>

      </div>
    </div>
  </div>
</div>