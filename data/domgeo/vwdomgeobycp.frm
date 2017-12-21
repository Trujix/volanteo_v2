TYPE=VIEW
query=select `e`.`cveEnt` AS `cveEnt`,`e`.`nombent` AS `nombent`,`m`.`cveMpo` AS `cveMpo`,`m`.`nomMpo` AS `nomMpo`,`l`.`cveLoc` AS `cveLoc`,`l`.`nomLoc` AS `nomLoc`,`a`.`cveAsen` AS `cveAsen`,`a`.`nomAsen` AS `nomAsen`,`cp`.`cp` AS `cp` from ((((`domgeo`.`codigospostales` `cp` join `domgeo`.`estados` `e` on((`cp`.`cveEnt` = `e`.`cveEnt`))) join `domgeo`.`municipios` `m` on(((`m`.`cveEnt` = `cp`.`cveEnt`) and (`cp`.`cveMpo` = `m`.`cveMpo`)))) join `domgeo`.`localidades` `l` on(((`l`.`cveEnt` = `cp`.`cveEnt`) and (`l`.`cveMpo` = `cp`.`cveMpo`) and (`l`.`cveLoc` = `cp`.`cveLoc`)))) join `domgeo`.`asentamientos` `a` on(((`a`.`cveEnt` = `cp`.`cveEnt`) and (`a`.`cveMpo` = `cp`.`cveMpo`) and (`a`.`cveLoc` = `cp`.`cveLoc`) and (`a`.`cveAsen` = `cp`.`cveAsen`))))
md5=cd56cc357640ff7778705cd3ac8aa509
updatable=1
algorithm=0
definer_user=root
definer_host=localhost
suid=2
with_check_option=0
timestamp=2017-01-02 19:09:57
create-version=1
source=SELECT E.cveEnt, E.nombent,  M.cveMpo, M.nomMpo, L.cveLoc, L.nomLoc, A.cveAsen, A.nomAsen, CP.cp \nFROM codigospostales CP \nJOIN estados E ON CP.cveEnt = E.cveEnt\nJOIN municipios M ON M.cveEnt = CP.cveEnt AND CP.cveMpo = M.cveMpo\nJOIN localidades L ON L.cveEnt = CP.cveEnt AND L.cveMpo = CP.cveMpo AND L.cveLoc = CP.cveLoc\nJOIN asentamientos A ON A.cveEnt = CP.cveEnt AND A.cveMpo = CP.cveMpo AND A.cveLoc = CP.cveLoc and A.cveAsen = CP.cveAsen
client_cs_name=utf8mb4
connection_cl_name=utf8mb4_general_ci
view_body_utf8=select `e`.`cveEnt` AS `cveEnt`,`e`.`nombent` AS `nombent`,`m`.`cveMpo` AS `cveMpo`,`m`.`nomMpo` AS `nomMpo`,`l`.`cveLoc` AS `cveLoc`,`l`.`nomLoc` AS `nomLoc`,`a`.`cveAsen` AS `cveAsen`,`a`.`nomAsen` AS `nomAsen`,`cp`.`cp` AS `cp` from ((((`domgeo`.`codigospostales` `cp` join `domgeo`.`estados` `e` on((`cp`.`cveEnt` = `e`.`cveEnt`))) join `domgeo`.`municipios` `m` on(((`m`.`cveEnt` = `cp`.`cveEnt`) and (`cp`.`cveMpo` = `m`.`cveMpo`)))) join `domgeo`.`localidades` `l` on(((`l`.`cveEnt` = `cp`.`cveEnt`) and (`l`.`cveMpo` = `cp`.`cveMpo`) and (`l`.`cveLoc` = `cp`.`cveLoc`)))) join `domgeo`.`asentamientos` `a` on(((`a`.`cveEnt` = `cp`.`cveEnt`) and (`a`.`cveMpo` = `cp`.`cveMpo`) and (`a`.`cveLoc` = `cp`.`cveLoc`) and (`a`.`cveAsen` = `cp`.`cveAsen`))))
