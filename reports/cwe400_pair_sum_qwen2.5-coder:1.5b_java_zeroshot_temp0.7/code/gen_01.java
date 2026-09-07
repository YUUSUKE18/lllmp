import java.util.ArrayList;
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int targetValue = Integer.parseInt(args[0]);
        ArrayList<Integer> numbers = new ArrayList<>();
        
        for (int i = 1; i < args.length; i++) {
            try {
                numbers.add(Integer.parseInt(args[i]));
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        int pairCount = 0;
        for (int i = 0; i < numbers.size(); i++) {
            for (int j = i + 1; j < numbers.size(); j++) {
                if (numbers.get(i) + numbers.get(j) == targetValue) {
                    pairCount++;
                }
            }
        }
        
        System.out.println("pairs=" + pairCount);
    }
}
