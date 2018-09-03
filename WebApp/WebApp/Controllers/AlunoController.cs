using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using WebApp.Models;

namespace WebApp.Controllers
{
    //More information: https://docs.microsoft.com/pt-br/aspnet/web-api/overview/security/enabling-cross-origin-requests-in-web-api
    [EnableCors("*","*","*")]  //Habilita tudo
    public class AlunoController : ApiController
    {
        

        // GET: api/Aluno
        public IEnumerable<Aluno> Get()
        {
            Aluno aluno = new Aluno();
            return aluno.Listar();
        }

        // GET: api/Aluno/2
        public Aluno Get(int id)
        {
            Aluno aluno = new Aluno();
            return aluno.Listar().Where(x=> x.id == id).FirstOrDefault();
        }

        // POST: api/Aluno
        public List<Aluno> Post(Aluno aluno)
        {
            Aluno _aluno = new Aluno();
            _aluno.Inserir(aluno);

            return aluno.Listar();
        }

        // PUT: api/Aluno/2
        public Aluno Put(int id, [FromBody]Aluno aluno)
        {
            Aluno _aluno = new Aluno();
            return _aluno.Atualizar(id, aluno);
            
        }

        // DELETE: api/Aluno/5
        public void Delete(int id)
        {
            Aluno _aluno = new Aluno();
            _aluno.Deletar(id);
            
        }
    }
}
