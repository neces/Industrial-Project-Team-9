using System;
using System.Collections.Generic;
using System.Text;

namespace Quizzz
{
    class Player
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public Score Score { get; set; }

        public Player(string id, string name, Score score) => 
            (Id, Name, Score) = (id, name, score);

        

        
    }
}
