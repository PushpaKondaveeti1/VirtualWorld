class Graph {
    constructor(points=[], segments=[]){
        this.points=points;
        this.segments= segments;
    }
    addPoint(point){
        this.points.push(point);
    }
    containsPoint(point){
        return this.points.find((p)=>p.equals(point));
    }
    tryAddPoint(point){
        if(!this.containsPoint(point)){
           this.addPoint(point);
           return true;
        }
        return false;

    }
    removePointByIndex(index){
        this.points.splice(index,1);
    }
    removePoint(point){
        const segs =this.getSegments(point);
        for(const seg of segs){
            this.removeSegment(seg);
        }
        this.points.splice(this.points.indexOf(point),1);
    }
    // Segments
    addSegment(segment){
        this.segments.push(segment);
    }
    containsSegment(segment){
        return this.segments.find((s)=>s.equals(segment));
    }
    tryAddSegment(segment){
        if(!this.containsSegment(segment) && !segment.p1.equals(segment.p2)){
          this.addSegment(segment);
           return true;
       }
       return false;
    }
    removeSegmentByIndex(index){
        this.segments.splice(index,1);
    }
    removeSegment(segment){
        this.segments.splice(this.segments.indexOf(segment),1);
    }
    getSegments(point){
        const segs=[];
        for(const seg of this.segments){
            if(seg.includes(point)){
                segs.push(seg);
            }
        }
        return segs;
    }
    dispose(){
        this.points=[];
        this.segments=[];
    }
  
    draw(ctx){
        for(const seg of this.segments){
            seg.draw(ctx);
        }
        for(const point of this.points){
            point.draw(ctx);
        }
    }
}