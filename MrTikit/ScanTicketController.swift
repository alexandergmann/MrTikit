//
//  ScanTicketController.swift
//  MrTikit
//
//  Created by Stephen Calabro on 3/28/16.
//  Copyright © 2016 MrTikit. All rights reserved.
//

import UIKit

class ScanTicketController: UIViewController {
    var toPass:String!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        NSLog(toPass)
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    @IBAction func goBack(sender : AnyObject) {
        //navigationController!.popViewControllerAnimated(true)
        self.dismissViewControllerAnimated(true, completion: nil);
    }
    
    /*
     // MARK: - Navigation
     
     // In a storyboard-based application, you will often want to do a little preparation before navigation
     override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
     // Get the new view controller using segue.destinationViewController.
     // Pass the selected object to the new view controller.
     }
     */
    
}
