using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Hosting;

namespace WebApp.Models
{
    public class Aluno
    {
        public int id { get; set; }
        public string nome { get; set; }
        public string  sobrenome { get; set; }
        public string telefone { get; set; }
        public int ra { get; set; }


        public List<Aluno> Listar()
        {
            //Alunos aluno = new Alunos();
            //aluno.id = 1;
            //aluno.nome = "Marta";
            //aluno.sobrenome = "Will";
            //aluno.telefone = "123456";
            //aluno.ra = 00001;

            //Alunos aluno1 = new Alunos();
            //aluno1.id = 2;
            //aluno1.nome = "Laura";
            //aluno1.sobrenome = "Usadora";
            //aluno1.telefone = "5556677";
            //aluno1.ra = 00002;

            //List<Alunos> lista = new List<Alunos>();
            //lista.Add(aluno);
            //lista.Add(aluno1);

            var caminhoArquivo = HostingEnvironment.MapPath(@"~/App_Data/Base.json");
            var json = File.ReadAllText(caminhoArquivo);
            var lista = JsonConvert.DeserializeObject<List<Aluno>>(json);

            return lista;
        }

        public bool ReescreverArquivo(List<Aluno> lista) {
            var caminhoArquivo = HostingEnvironment.MapPath(@"~/App_Data/Base.json");
            var json = JsonConvert.SerializeObject(lista, Formatting.Indented) ;
            File.WriteAllText(caminhoArquivo, json);
            
            return true;
        }

        public Aluno Inserir(Aluno Aluno) {
            var lista = this.Listar();

            var maxId = lista.Max(p => p.id);
            Aluno.id = maxId + 1;
            lista.Add(Aluno);

            ReescreverArquivo(lista);

            return Aluno;
        }

        public Aluno Atualizar(int id, Aluno Aluno) {
            var lista = this.Listar();

            var itemIdex = lista.FindIndex(p => p.id == Aluno.id);

            if (itemIdex >= 0)
            {
                Aluno.id = id;
                lista[itemIdex] = Aluno;
            }
            else {
                return null;
            }

            ReescreverArquivo(lista);
            return Aluno;


        }

        public bool Deletar(int id)
        {
            var lista = this.Listar();

            var itemIndex = lista.FindIndex(p => p.id == id);
            
            if (itemIndex >= 0)
            {
                lista.RemoveAt(itemIndex);
            }
            else
            {
                return false;
            }

            ReescreverArquivo(lista);
            return true;
            
        }

    }
}