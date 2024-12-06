datos=[[
    {
        "usuario":"juank",
        "id":"241bf55d-b649-4109-af7c-0e6890ded3fc",
        "contraseña":"juank12345",
        "tipo":1
    }
],
[{
    "usuario":"carloss",
    "id":"b6e03689-cccd-478e-8565-d92f40813b13",
    "contraseña":"carloss12345",
    "tipo":2
}],
[{
    "usuario":"admin",
    "id":"b6e03689-cccd-478e-8565-d92f40813b25",
    "contraseña":"carloss12345",
    "tipo":3
}]
]

const dts=[]
for (let i = 0; i < 3; i++) {
    const data = datos[i]; // data es un arreglo
    data.forEach(element => {
      dts.push(element)
    });
  }

  console.log(dts)
