import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'searchFilter',
    pure: false
})
export class SearchPipe implements PipeTransform {
    transform(items: any[], filter: any): any {

        //if there is no items or filter passed in, return everything
        if (!items || !filter) {
            return items;
        }

        //if filtering by name
        if (filter.name) {
            return items.filter( item => {
                return item.customer.toLowerCase().includes(filter.name);
            });

        //if filtering by id
        } else if (filter.id) {
            return items.filter( item => {
                return item.id.toLowerCase().includes(filter.id);
            });
        
        //if filtering by address
        } else if (filter.address) {
            return items.filter( item => {
                return item.destination.toLowerCase().includes(filter.address);
            });

        //if filtering by price
        } else if (filter.price) {
            return items.filter( item => {
                // must convert to string if we want to search all numbers contained within the number
                return item.price.toString().includes(filter.price);
            });

        //if filtering by menu item
        } else if (filter.menuItem) {
            return items.filter( item => {
                return item.item.toLowerCase().includes(filter.menuItem);
            });
        } else {
            return items;
        }
        
    }
}