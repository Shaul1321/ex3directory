using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using ex3.Models;
using System.Security.Cryptography;
using System.Text;
using Newtonsoft.Json.Linq;

namespace ex3.Controllers
{
    public class UsersController : ApiController
    {
        private ex3Context db = new ex3Context();

        string ComputeHash(string input)
        {
            SHA1 sha = SHA1.Create();
            byte[] buffer = Encoding.ASCII.GetBytes(input);
            byte[] hash = sha.ComputeHash(buffer);
            string hash64 = Convert.ToBase64String(hash);
            return hash64;
        }

        // GET: api/Users
        public IEnumerable<Users> GetUsers()
        {
            IEnumerable<Users> list = db.Users.Where(row => true);
            return list;
        }

        // GET: api/Users
        [Route("api/Users/addUser/{userName}/{password}")]
        [HttpGet]
        [ResponseType(typeof(Users))]
        public IHttpActionResult AddUser(string userName, string password)
        {
            string hashedPassowrd = ComputeHash(password);
            DateTime currentTime = DateTime.Now;
            IQueryable < Users > existingUsers = db.Users.Where(row => row.UserName == userName);
            if (existingUsers.Any())
            {
                return BadRequest();
            }
            Users user = new Users { UserName = userName, EncryptedPassword = hashedPassowrd, SigningDate= currentTime, Wins=0, Loses=0 };
            db.Users.Add(user);
            db.SaveChanges();
            
            return Ok(user);
            //return CreatedAtRoute("DefaultApi", new { id = user.Id }, user);
        }


        // GET: api/Users
        [Route("api/Users/updateScore/{userName}/{won}")]
        [HttpGet]
        [ResponseType(typeof(Users))]
        public IHttpActionResult UpdateUserScore(string userName, Boolean won)
        {

            IEnumerable<Users> existingUsers = db.Users.Where(row => row.UserName == userName);
            if (existingUsers.Any())
            {
                Users theUser = existingUsers.ElementAt(0);
                if (won) {
                    theUser.Wins += 1;
                }
                else
                {
                    theUser.Loses += 1;
                }
                db.SaveChanges();
                return Ok(theUser);
            }
            return BadRequest();
            //return CreatedAtRoute("DefaultApi", new { id = user.Id }, user);
        }

        // GET: api/Users
        [Route("api/Users/login/{userName}/{password}")]
        [HttpGet]
        [ResponseType(typeof(Users))]
        public IHttpActionResult Login(string userName, string password)
        {
            string hashedPassowrd = ComputeHash(password);
            IEnumerable<Users> existingUsers = db.Users.Where(row => row.UserName == userName && row.EncryptedPassword == hashedPassowrd);
            if (existingUsers.Count()!=0)
            {
                return Ok(existingUsers.ElementAt(0));
            }
            return NotFound();
            //return CreatedAtRoute("DefaultApi", new { id = user.Id }, user);
        }
        /*
// GET: api/Users/5
[ResponseType(typeof(Users))]
public async Task<IHttpActionResult> GetUsers(int id)
{
    Users users = await db.Users.FindAsync(id);
    if (users == null)
    {
        return NotFound();
    }

    return Ok(users);
}

// PUT: api/Users/5
[ResponseType(typeof(void))]
public async Task<IHttpActionResult> PutUsers(int id, Users users)
{
    if (!ModelState.IsValid)
    {
        return BadRequest(ModelState);
    }

    if (id != users.Id)
    {
        return BadRequest();
    }

    db.Entry(users).State = EntityState.Modified;

    try
    {
        await db.SaveChangesAsync();
    }
    catch (DbUpdateConcurrencyException)
    {
        if (!UsersExists(id))
        {
            return NotFound();
        }
        else
        {
            throw;
        }
    }

    return StatusCode(HttpStatusCode.NoContent);
}

// POST: api/Users
[ResponseType(typeof(Users))]
public async Task<IHttpActionResult> PostUsers(Users users)
{
    if (!ModelState.IsValid)
    {
        return BadRequest(ModelState);
    }

    db.Users.Add(users);
    await db.SaveChangesAsync();

    return CreatedAtRoute("DefaultApi", new { id = users.Id }, users);
}

// DELETE: api/Users/5
[ResponseType(typeof(Users))]
public async Task<IHttpActionResult> DeleteUsers(int id)
{
    Users users = await db.Users.FindAsync(id);
    if (users == null)
    {
        return NotFound();
    }

    db.Users.Remove(users);
    await db.SaveChangesAsync();

    return Ok(users);
}

protected override void Dispose(bool disposing)
{
    if (disposing)
    {
        db.Dispose();
    }
    base.Dispose(disposing);
}

private bool UsersExists(int id)
{
    return db.Users.Count(e => e.Id == id) > 0;
}
    */
    }
}