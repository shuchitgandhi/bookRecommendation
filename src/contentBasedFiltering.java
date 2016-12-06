import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import org.mymedialite.correlation.BinaryCosine;
import org.mymedialite.correlation.CorrelationMatrix;
import org.mymedialite.data.EntityMapping;
import org.mymedialite.datatype.SparseBooleanMatrix;

public class contentBasedFiltering {

  // Configuration
  public static final String MODEL_FILE_NAME = "bookRecoEngine.js";
  public static final int K = 20;
  protected static EntityMapping featureMapping = new EntityMapping();
  
  public static void main(String[] args) {
    try {
      modelCreation(MODEL_FILE_NAME);
    }
    catch (Throwable e) {
      e.printStackTrace();
    }
  }

  public static void modelCreation(String filename) throws IOException {
    
    String standardTime = "2016-11-23T10:00:00Z";
    
    List<String> sortedBookIds = new ArrayList<String>();  //(we use book ratings by other users)

    SparseBooleanMatrix bookFeatures = new SparseBooleanMatrix();
    for(int i=0; i < sortedBookIds.size(); i++) {
      Set<String> featureVectors = new HashSet<String>();  // TODO add the features for the books to this list
      for(String feature : featureVectors) {
        Integer featureId = featureMapping.toInternalID(feature);
        bookFeatures.set(i, featureId, true);
      }
    }

    // Build the correlation matrix
    CorrelationMatrix correlationMatrix = BinaryCosine.create(bookFeatures);
    int numItems = bookFeatures.numberOfRows();
    int[][] nearestNeighbors = new int[numItems][];
    for (int i = 0; i < numItems; i++)  
      nearestNeighbors[i] = correlationMatrix.getNearestNeighbors(i, K);

  }
}
