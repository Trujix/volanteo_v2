<div id="viewWorks" hidden>
  <div class="page-title">
    <div class="form-group col-md-12 col-sm-12 col-xs-12 header_tablas">
      <!-- <div class="col-md-12" > -->
        <div class="col-md-3 col-sm-6 col-xs-6">
          <select name="" class="form-control col-md-12 col-sm-12 col-xs-12" id="select_ac_in">
          <option value="2" selected>TODOS</option>
          <option value="1">ACTIVOS</option>
          <option value="0">INACTIVOS</option>
        </select>
        </div>
        <div class="col-md-4 col-sm-6 col-xs-6">
          <button id="btn_nuevo" class="btn btn-primary col-md-12 col-sm-12 col-xs-12">NUEVO TRABAJO</button>
        </div>
      <!-- </div> -->
      <div class="col-md-4 col-sm-12 col-xs-12 form-group pull-right top_search margin_search">
        <div class="input-group">
            <input type="text" value="" class="form-control" id="buscar" placeholder="Busqueda...">
            <span class="input-group-btn">
                <button class="btn btn-default" type="button">Busca!</button>
            </span>
        </div>
      </div>    
    </div>
  </div>

  <div class="clearfix"></div>

  <div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="x_panel">
        <div class="x_title">
          <h2>Trabajos</h2>
          <ul class="nav navbar-right panel_toolbox">
          </ul>
          <div class="clearfix"></div>
        </div>

        <div id="tableContainer" class="x_content table-responsive">

          <!-- start project list -->
          <table class="table table-striped projects">
              <thead id="thead">
              </thead>
              <tbody id="tbody">
              </tbody>
          </table>
          <!-- end project list -->

        </div>

      </div>
    </div>
  </div>
</div>