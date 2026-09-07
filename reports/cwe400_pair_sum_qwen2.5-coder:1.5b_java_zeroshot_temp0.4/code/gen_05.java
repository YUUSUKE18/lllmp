import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        int target = Integer.parseInt(System.in);
        List<Integer> numbers = new ArrayList<>();
        
        for (int i = 2; i <= target; i++) {
            String line = System.in.nextLine();
            if (line.isEmpty() || !line.matches("\\d+")) {
                continue;
            }
            numbers.add(Integer.parseInt(line));
        }
        
        int count = 0;
        for (int i = 0; i < numbers.size(); i++) {
            for (int j = i + 1; j < numbers.size(); j++) {
                if (numbers.get(i) + numbers.get(j) == target) {
                    count++;
                }
            }
        }
        
        System.out.println("pairs=" + count);
    }
}
